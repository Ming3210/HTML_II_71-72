import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  addUser,
  deleteUser,
  editUser,
} from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { User } from "../../interface";

export default function Admin() {
  // lấy dữ liệu về
  const getDate: any = useSelector((state) => state);
  // console.log(1111,getDate);
  const disPatch = useDispatch();
  useEffect(() => {
    disPatch(getUser());
  }, []);
  // hàm đi thêm mới user
  const addNewUser = () => {
    let newUser = {
      name: "thảo phương1234",
    };
    disPatch(addUser(newUser));
  };
  // hàm đi xóa user

  const handleDeleteUser = (id: any) => {
    disPatch(deleteUser(id));
  };
  const handleEditUser = (user: User) => {
    let name = prompt("Nhap ten", user.name);
    const updatedUser = { ...user, name };
    disPatch(editUser(updatedUser));
  };
  return (
    <div>
      Admin
      {getDate.user.users.map((user: User) => (
        <li key={user.id}>
          {user.name}{" "}
          <button onClick={() => handleDeleteUser(user.id)}>xóa</button>
          <button onClick={() => handleEditUser(user)}>Sửa</button>
        </li>
      ))}
      <button onClick={addNewUser}>add User</button>
    </div>
  );
}
