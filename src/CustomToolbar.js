import {GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}export default CustomToolbar;