import React from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, LinearProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
export default function DataTable(props) {
  const style = {
    borderRadius: "0px",
    "& .MuiDataGrid-columnHeaders.css-f3jnds-MuiDataGrid-columnHeaders": {
      backgroundColor: "#26A69A",
      borderRadius: "0px",
      "& .MuiButtonBase-root.MuiCheckbox-root": {
        color: "white",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        color: "white",
      },
    },
  };
  return (
    <DataGrid
      density="compact"
      sx={style}
      {...props}
      //  pageSize={5}
      //  rowsPerPageOptions={[5]}
      //  checkboxSelection
      disableSelectionOnClick
      //  experimentalFeatures={{ newEditingApi: true }}
      components={{
        Toolbar: CustomToolbar,
        LoadingOverlay: LinearProgress,
      }}
      componentsProps={{ toolbar: { onAdd: props.onAdd } }}
      // getRowId={(row) => row.id}
    />
  );
}

function CustomToolbar({ onAdd }) {
  return (
    <div className="d-flex justify-content-between">
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
      <GridToolbarContainer>
        {onAdd && (
          <Button
            variant="outlined"
            size="small"
            onClick={onAdd}
            startIcon={<Add />}
            sx={{ mb: 1, mt: 0.5 }}
          >
            Add new
          </Button>
        )}
      </GridToolbarContainer>
    </div>
  );
}
