import React, { useEffect, useState } from "react";
import ServerSideDataTable from "../../components/table";
import ReusableDialog from "../../components/dialog";
import { Button, IconButton } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import { Delete, Edit } from "@mui/icons-material";
import { getUserThunk } from "../../store/thunk/userThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: string;
  mobile: string;
  date_of_birth: string;
  password: string;
}

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [userData, setUserData] = useState<any>({});

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk({}));
  }, []);

  const handleOpenDialog = (value?: any) => {
    setOpenDialog(true);
    if (value) {
      setUserData(sampleUsers.find((val: any) => val.id == value));
    } else {
      setUserData(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserData(null);
  };

  const handleOpenDialogDelete = (value?: any) => {
    setOpenDialogDelete(true);
    if (value) {
      setUserData(sampleUsers.find((val: any) => val.id == value));
    } else {
      setUserData(null);
    }
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setUserData(null);
  };

  const fetchData = async (page: number, rowsPerPage: number) => {
    try {
      setData(sampleUsers);
      setTotalRows(10);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleConfirmAction = () => {
    handleCloseDialogDelete();
    dispatch(
      getUserThunk({
        payload: {
          id: userData.id,
        },
      })
    );
  };

  const columns = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "username", label: "Username" },
    { name: "role", label: "Role" },
    { name: "mobile", label: "Mobile" },
    { name: "date_of_birth", label: "Date of Birth" },
    { name: "password", label: "Password" },
    {
      name: "id",
      label: "Options",
      options: {
        customBodyRender: (value: any) => {
          return (
            <div>
              <IconButton
                onClick={() => handleOpenDialog(value)}
                aria-label="Edit"
              >
                <Edit color="primary" />
              </IconButton>
              <IconButton
                onClick={() => handleOpenDialogDelete(value)}
                aria-label="Delete"
              >
                <Delete color="error" />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <ReusableDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        title="Confirmation"
        content={<RegistrationForm data={userData} />}
        actions={[]}
      />
      <ReusableDialog
        open={openDialogDelete}
        handleClose={handleCloseDialogDelete}
        title="Confirmation"
        content={"Are you sure you want to delete this user?"}
        actions={[
          {
            label: "Cancel",
            onClick: handleCloseDialogDelete,
            color: "secondary",
          },
          { label: "Confirm", onClick: handleConfirmAction },
        ]}
      />
      <ServerSideDataTable
        columns={columns}
        options={{
          rowsPerPage: 10,
          serverSide: true,
          count: totalRows,
          selectableRows: "none",
          customToolbar: () => (
            <Button onClick={handleOpenDialog}>Add New User</Button>
          ),
        }}
        fetchData={fetchData}
        data={data}
        totalRows={totalRows}
      />
    </>
  );
};

export default UsersList;

const sampleUsers: User[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    role: "Admin",
    mobile: "+1234567890",
    date_of_birth: "1990-01-01",
    password: "password123",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    role: "User",
    mobile: "+1987654321",
    date_of_birth: "1985-05-15",
    password: "p@ssw0rd",
  },
  {
    id: 3,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    username: "alicejohnson",
    role: "User",
    mobile: "+1654321897",
    date_of_birth: "1993-07-20",
    password: "hello123",
  },
  {
    id: 4,
    first_name: "Bob",
    last_name: "Williams",
    email: "bob.williams@example.com",
    username: "bobby",
    role: "User",
    mobile: "+1122334455",
    date_of_birth: "1988-11-30",
    password: "qwerty",
  },
  {
    id: 5,
    first_name: "Emily",
    last_name: "Brown",
    email: "emily.brown@example.com",
    username: "emilybrown",
    role: "User",
    mobile: "+1567890123",
    date_of_birth: "1995-03-25",
    password: "abc123",
  },
  {
    id: 6,
    first_name: "Michael",
    last_name: "Jones",
    email: "michael.jones@example.com",
    username: "mikejones",
    role: "Admin",
    mobile: "+1908765432",
    date_of_birth: "1983-09-12",
    password: "pass123",
  },
  {
    id: 7,
    first_name: "Emma",
    last_name: "Davis",
    email: "emma.davis@example.com",
    username: "emmadavis",
    role: "User",
    mobile: "+1765432901",
    date_of_birth: "1992-12-05",
    password: "letmein",
  },
  {
    id: 8,
    first_name: "William",
    last_name: "Wilson",
    email: "william.wilson@example.com",
    username: "willwilson",
    role: "User",
    mobile: "+1543210987",
    date_of_birth: "1987-06-18",
    password: "welcome",
  },
  {
    id: 9,
    first_name: "Olivia",
    last_name: "Martinez",
    email: "olivia.martinez@example.com",
    username: "oliviamart",
    role: "User",
    mobile: "+1320987654",
    date_of_birth: "1991-04-08",
    password: "test123",
  },
  {
    id: 10,
    first_name: "James",
    last_name: "Taylor",
    email: "james.taylor@example.com",
    username: "jamest",
    role: "Admin",
    mobile: "+1998877665",
    date_of_birth: "1986-08-22",
    password: "secure123",
  },
];
