<template>
  <div class="user">
    <el-table :data="userInfos" stripe style="width: 100%">
      <el-table-column :align="align" prop="idCard" label="ID" width="200"></el-table-column>
      <el-table-column :align="align" prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column :align="align" prop="userName" label="用户名" width="100"></el-table-column>
      <el-table-column :align="align" prop="passWord" label="密码" width="100"></el-table-column>
      <!-- <el-table-column :align="align" prop="resVote" label="剩余票量" width="80"></el-table-column>
      <el-table-column :align="align" sortable prop="outTime" label="出发时间"></el-table-column>
      <el-table-column :align="align" sortable prop="overTime" label="抵达时间"></el-table-column>
      <el-table-column :align="align" prop="outCity" label="出发城市"></el-table-column>
      <el-table-column :align="align" prop="overCity" label="抵达城市"></el-table-column>-->
      <el-table-column :align="align" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
      <el-form ref="editForm" :rules="rules" :model="editForm">
        <el-form-item label="身份证号" prop="idCard">
          <el-input type="number" v-model.number="editForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="text" v-model="editForm.passWord"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handlePrimary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUser, editUser } from "api/getuser";
import { ERR_OK } from "common/js/config";

export default {
  data() {
    return {
      userInfos: [],
      align: "center",
      dialogFormVisible: false,
      editForm: {},
      rules: {
        idCard: [
          { type: "number", message: "身份证号必须为数字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this._getUser();
  },
  methods: {
    _getUser() {
      getUser().then(res => {
        if (res.data.code === ERR_OK) {
          this.userInfos = res.data.userInfo.reverse();
        }
      });
    },
    _warnMes(message) {
      this.$notify({
        title: "消息",
        message: message,
        type: "warning"
      });
    },
    _successMes(message) {
      this.$notify({
        title: "成功",
        message: message,
        type: "success"
      });
    },
    _resetForm(editForm) {
      this.$refs[editForm].resetFields();
    },
    _editUser(editForm) {
      editUser(editForm).then(res => {
        console.log(res);
        if (res.data.code === ERR_OK) {
          this._resetForm("editForm");
          this._getUser();
          this._successMes("编辑成功");
        }
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editForm.id = row._id;
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this._resetForm("editForm");
      this._warnMes("您取消了编辑");
    },
    handlePrimary() {
      this.dialogFormVisible = false;
      if (
        this.editForm.idCard ||
        this.editForm.name ||
        this.editForm.passWord
      ) {
        console.log(this.editForm);
        this._editUser(this.editForm);
      }
    }
  }
};
</script>

