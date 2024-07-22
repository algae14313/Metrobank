<<<<<<< HEAD
import React from 'react'
import { DataGrid, gridClasses } from '@mui/x-data-grid'

export default function DataGrids({ columnsTest, rowsTest, descCol, colVisibility }) {
=======
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import './css/DataGrids.css'

export default function DataGrids({ columnsTest, rowsTest, descCol, colVisibility }) {

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    return (
        <DataGrid
            rows={rowsTest}
            columns={columnsTest}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    },
                },
                sorting: {
                    sortModel: [{ field: descCol, sort: 'desc' }],
                },
            }}
            getRowHeight={() => 'auto'}
            sx={{
<<<<<<< HEAD
                [`& .${gridClasses.cell}`]: {
                  py: 2,
                },
              }}
=======
                '& .MuiDataGrid-cell': {
                    borderColor: 'inherit',
                },
                [`& .${gridClasses.cell}`]: {
                    py: 2,
                },
                [`& .${gridClasses.row}:hover`]: {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                [`& .${gridClasses.columnHeader}`]: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: '#cfcfcf',
                },
                [`& .${gridClasses.columnHeaderTitle}`]: {
                    color: 'black',
                },
            }}
            className="data-grid"
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
            columnVisibilityModel={colVisibility}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
        />
    )
}