import * as ReactDOM from 'react-dom';
import * as React from 'react';
// @ts-ignore
import ReactTable from "old-react-table";
// @ts-ignore
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';


const OldTable = () => {

    const data = [{
        name: 'Tanner Linsley',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        }
    },{
        name: 'Pepito',
        age: 100,
        friend: {
            name: 'Antonio Banderas',
            age: 1,
        }
    }];

    const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
    }, {
        Header: 'Age',
        accessor: 'age',
        Cell: (props: any) => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: (d: any) => d.friend.name // Custom value accessors!
    }, {
        Header: (props: any) => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
    }]

    return <div style={{backgroundColor: "rgb(255 223 223)", height: '300px'}}><ReactTable
        data={data}
        columns={columns}
    /></div>
};

const NewTable = () => {
    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        // apply the table props
        <div style={{backgroundColor: 'rgb(223 232 255)'}}><table {...getTableProps()}>
            <thead>
            {// Loop over the header rows
                headerGroups.map((headerGroup: any) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                            headerGroup.headers.map((column: any) => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
                                    {// Render the header
                                        column.render('Header')}
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
                rows.map((row: any) => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                            {// Loop over the rows cells
                                row.cells.map((cell: any) => {
                                    // Apply the cell props
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {// Render the cell contents
                                                cell.render('Cell')}
                                        </td>
                                    )
                                })}
                        </tr>
                    )
                })}
            </tbody>
        </table></div>
    );

}

const RootElement = () => <div>
    <OldTable />
    <NewTable />
</div>

ReactDOM.render(<RootElement />, document.getElementById('app'));