 export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nameCourse', headerName: 'CourseName', width: 230,renderCell:(parms)=>{
        return(
            <div className="cellWithImag">
                {parms.row.nameCourse}
            </div>
        )
    }
    },

    {
      field: 'cost',
      headerName: 'Cost',
      width: 250,
    },
    {
        field: 'startDate',
        headerName: 'startDate',
        width: 120,
      },
      {
        field: 'endDate',
        headerName: 'endDate',
        width: 160,
    },
    {
        field: 'stataus',
        headerName: 'stataus',
        width: 160,
        renderCell:(params)=>{
            return <div className={`cellWithStatus ${params.row.stataus}`}>{params.row.stataus}</div>
        }
    },

  ];

  export const userColumnsStudens = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name', width: 230,renderCell:(parms)=>{
        return(
            <div className="cellWithImag">
                {parms.row.name}
            </div>
        )
    }
    },

    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
        field: 'telphone',
        headerName: 'Telphone',
        width: 120,
      },
      {
        field: 'address',
        headerName: 'Address',
        width: 160,
    },

  ];
