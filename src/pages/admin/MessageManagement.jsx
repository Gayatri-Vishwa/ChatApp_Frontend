import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../components/constants/sampleData'
import { Avatar,Box,Stack } from '@mui/material'
import { fileFormat, transformImage } from '../../lib/featues'
import moment from 'moment'
import RenderAttachments from '../../components/shared/RenderAttachments'

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200
},{
  field:"attachments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
    const {attachments}=params.row;
    return attachments?.length >0 ?
    attachments.map((i)=>{

      const url=i.url;
      const file=fileFormat(url)
      return (
        <Box>
          <a href={url} download target='blank' style={{
            color:"black"
          }}>
          <RenderAttachments file={file} url={url} />
          </a>
        </Box>
      )

// return <Avatar alt={i.name} src={i.avatar}/>
    })
    :"No Attachments"
  
  }
},
{
  field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400
},
{
   field:"sender",
  headerName:"Send By",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>(
  <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
<Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
<span>{params.row.sender.name}</span>
  </Stack>)
},
{
  field:"chat",
  headerName:"Chat",
  headerClassName:"table-header",
  width:220
},
{
  field:"groupChat",
  headerName:"GroupChat",
  headerClassName:"table-header",
  width:100
},
{
  field:"createdAt",
  headerName:"Time",
  headerClassName:"table-header",
  width:250
},

]

function MessageManagement() {
  const [rows,setRows]=useState([])
useEffect(() => {
  setRows(
    dashboardData.messages.map((i) => ({
      ...i,
      id: i._id,  
      sender: {
        name: i.sender?.name,
        avatar: transformImage(i.sender?.avatar,50)
      },
      // attachments:{
      //   url:transformImage(i.attachments.url)
      // },
      createdAt:moment(i.createdAt).format("MMMM Do YYYYY, h:mm:ss a"),

    }))
  );
}, []);
  return (
  <AdminLayout>
  <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={150}/>
  </AdminLayout>
  )
}

export default MessageManagement
