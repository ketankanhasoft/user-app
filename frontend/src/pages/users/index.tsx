import React, { useEffect, useState } from "react";
import ServerSideDataTable from "../../components/table";
import ReusableDialog from "../../components/dialog";
import { Button, IconButton } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import { Delete, Edit } from "@mui/icons-material";
import { deleteUserThunk, getUserThunk } from "../../store/thunk/userThunk";
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
  const userList = useAppSelector((state) => state.usersSlice.userList);
  const userToken = useAppSelector((state) => state.authSlice.userData.token);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  useEffect(() => {
    setData(userList);
  }, [userList]);

  useEffect(() => {
    dispatch(getUserThunk({ token: userToken }));
  }, []);

  const handleOpenDialog = (value?: any) => {
    setOpenDialog(true);
    if (value) {
      setUserData(userList.find((val: any) => val.id == value));
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
      setUserData(userList.find((val: any) => val.id == value));
    } else {
      setUserData(null);
    }
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setUserData(null);
  };

  const handleConfirmAction = () => {
    handleCloseDialogDelete();
    dispatch(
      deleteUserThunk({
        token:userToken,
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
        content={<RegistrationForm data={userData} handleCloseDialog={handleCloseDialog} />}
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
        data={data}
        totalRows={totalRows}
      />
    </>
  );
};

export default UsersList;

