// import React, { useEffect, useState } from "react";
// import { Container, Box } from "@material-ui/core";
// import { DataGrid } from "@material-ui/data-grid";
// import { getTableData, getTableCount } from "api";

// const columns = [
//   { field: "code", headerName: "code", width: 250 },
//   { field: "name", headerName: "name", flex: 1 },
//   { field: "city", headerName: "city", flex: 1 }
// ];

// const PAGE_SIZE = 15;

// export default function MasterPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Number of rows which exist on the service
//   const [rowCount, setRowCount] = useState(0);

//   const loadData = async (isFirstLoad, skip = 0) => {
//     try {
//       setItems([]);
//       setLoading(true);

//       if (isFirstLoad) {
//         const count = await getTableCount();
//         setRowCount(count);
//       }

//       const _items = await getTableData({
//         $top: PAGE_SIZE,
//         $skip: skip
//       });
//       const itemsWithIds = _items.map((item, index) => {
//         item.id = index;
//         return item;
//       });
//       setItems(itemsWithIds);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChanged = ({ page }) => {
//     loadData(false, page * PAGE_SIZE);
//   };

//   useEffect(() => {
//     // when component mounted
//     loadData(true);
//   }, []);

//   return (
//     <Container disableGutters>
//       <Box height="80vh" py={5}>
//         <DataGrid
//           loading={loading}
//           rows={items}
//           columns={columns}
//           pageSize={PAGE_SIZE}
//           paginationMode="server"
//           rowCount={rowCount}
//           onPageChange={handlePageChanged}
//         />
//       </Box>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getTableData, getTableCount } from "api";

const columns = [
  { field: "code", headerName: "Code", width: 250 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "city", headerName: "City", flex: 1 }
];

const PAGE_SIZE = 15;

export default function MasterPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const loadData = async (isFirstLoad, skip = 0) => {
    try {
      setItems([]);
      setLoading(true);

      if (isFirstLoad) {
        const count = await getTableCount();
        setRowCount(count);
      }

      const _items = await getTableData({
        $top: PAGE_SIZE,
        $skip: skip
      });

      const itemsWithIds = _items.map((item, index) => ({
        ...item,
        id: index + skip, // unique id per row
      }));

      setItems(itemsWithIds);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChanged = (params) => {
    loadData(false, params * PAGE_SIZE);
  };

  useEffect(() => {
    loadData(true);
  }, []);

  return (
    <Container disableGutters>
      <Box height="80vh" py={5}>
        <DataGrid
          loading={loading}
          rows={items}
          columns={columns}
          pageSize={PAGE_SIZE}
          paginationMode="server"
          rowCount={rowCount}
          onPageChange={handlePageChanged}
          page={0} // Required to prevent controlled/uncontrolled warning
        />
      </Box>
    </Container>
  );
}

