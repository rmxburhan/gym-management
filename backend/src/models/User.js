const {model , Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        index : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    gender : {
        type : String,
        enum : ['male', 'female']
    },
    membershipActive : {
        type : Boolean,
        default : false,
        required : true
    }
}, {timestamps : true})

userSchema.pre('save', function (next) {
    const user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next()
            })
        })
    } else {
        return next();
    }
})


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Comparison failed',error);
    }
}

const User = model("User", userSchema);
module.exports = User;