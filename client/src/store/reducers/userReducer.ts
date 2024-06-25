// khởi tạo state
import axios from "axios";
import { User } from "../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const user: User[] = [];
// hàm lấy tất cả user
export const getUser: any = createAsyncThunk("users/getAllUser", async () => {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
});
// hàm đi thêm mới user
export const addUser: any = createAsyncThunk("users/addUser", async (user) => {
    const response = await axios.post("http://localhost:8080/users", user);
    return response.data;
});
// hàm đi xóa user
export const deleteUser:any = createAsyncThunk(
    "users/deleteUser",
    async (id: number) => {
        const response = await axios.delete(`http://localhost:8080/users/${id}`);
        
        return {id};
    }
);

export const editUser: any = createAsyncThunk(
    "users/editUser",
    async (user: User) => {
        const response = await axios.put(`http://localhost:8080/users/${user.id}`, user);
        return response.data;
    }
);

const reducerUser = createSlice({
    name: "user",
    initialState: {
        users: [],
    },
    reducers: {
        // khai báo các action
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state: any, action: any) => {
                // trạng thái chờ lấy dữ liệu
            })
            .addCase(getUser.fulfilled, (state: any, action: any) => {
                // trạng thái lấy dữ liệu thành công
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state: any, action: any) => {
                // trạng thái lấy dữ liệu thất bại
            })
            .addCase(addUser.fulfilled, (state: any, action: any) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state: any, action: any) => {
                console.log("Before deletion:", state.users);
                state.users = state.users.filter((user:any) => user.id !== action.payload.id);
                console.log("After deletion:", state.users);
            }) .addCase(editUser.fulfilled, (state:any, action:any) => {
                const index = state.users.findIndex((user:User) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload; // Cập nhật thông tin người dùng đầy đủ
                }
            });
    
    },
});
// xuất ra các action

// xuất reducer
export default reducerUser.reducer;
