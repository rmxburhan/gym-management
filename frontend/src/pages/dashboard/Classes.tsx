import { PencilIcon, PlusIcon, Trash } from 'lucide-react';
import Name from '../../components/Name';

const Classes = () => {
    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">Classes</h1>
            <div className="flex flex-col">
                <div
                    id="table-container"
                    className="w-full px-6 py-8 rounded-3xl bg-white"
                >
                    <div className="flex flex-row mb-4">
                        <input
                            type="text"
                            name="search"
                            id="searchQuery"
                            className="px-4 py-2 border bg-white rounded outline-none focus:border-indigo-500"
                            placeholder="Searh..."
                        />
                        <button className="px-[18px] py-[12px] bg-indigo-800 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center">
                            <PlusIcon size={20} />
                            <span>Add</span>
                        </button>
                    </div>

                    <table className="table-auto w-full">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>No.</th>
                                <th>Class Name</th>
                                <th>Trainer</th>
                                <th>Date / Time</th>
                                <th>Participants</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td>Yoga</td>
                                <td>
                                    <Name
                                        name="Farhan"
                                        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQae9FkVDq-pht9_nec324ZbRxcuV7juKPPvA&s"
                                    />
                                </td>
                                <td>Senin, 12 Januari / 08:00 - 09:00</td>
                                <td>30</td>
                                <td>
                                    <div className="flex flex-row gap-2 my-auto">
                                        <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                            <PencilIcon size={20} />
                                        </button>

                                        <button className="p-2 bg-indigo-500 text-indigo-100 rounded">
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Classes;
