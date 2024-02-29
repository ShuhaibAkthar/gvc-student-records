import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListStudents() {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        ncc: false,
        scout: false,
        club: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const { ipcRenderer } = window.electron;

        ipcRenderer.on("success-res", (event, data) => {
            data = JSON.parse(data);
            setStudents(data.students);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        });

        ipcRenderer.on("error-res", (event, errorMessage) => {
            console.error("Error fetching students:", errorMessage);
            // Handle the error as needed
        });

        return () => {
            ipcRenderer.removeAllListeners("success-res");
            ipcRenderer.removeAllListeners("error-res");
        };

    }, []);

    useEffect(() => {

        const fetchStudents = async () => {
            console.log("fetchStudents");
            try {

                const queryData = { page: currentPage, query, filters };
                await api.getStudents(queryData);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, [currentPage, query, filters]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: name === "club" ? value : checked,
        }));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <h1>Student List</h1>
            <div>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    value={query}
                    onChange={handleSearch}
                />
            </div>
            <div>
                <label>
                    NCC:
                    <input
                        type="checkbox"
                        name="ncc"
                        checked={filters.ncc}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Scout:
                    <input
                        type="checkbox"
                        name="scout"
                        checked={filters.scout}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Club:
                    <select
                        name="club"
                        value={filters.club}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Club</option>
                        <option value="club1">Club 1</option>
                        <option value="club2">Club 2</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border={"1"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reg No</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.regNo}</td>
                            <td>
                                <Link
                                    to={`/student/edit/${student._id}`}
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default ListStudents