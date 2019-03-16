<template>
  <div class="admin">
    <el-table :data="ticDatas" stripe style="width: 100%">
      <el-table-column :align="align" prop="ticId" label="车次" width="70"></el-table-column>
      <el-table-column :align="align" prop="price" label="票价" width="70"></el-table-column>
      <el-table-column :align="align" prop="disCount" label="折扣" width="50"></el-table-column>
      <el-table-column :align="align" prop="totalVote" label="总票量" width="70"></el-table-column>
      <el-table-column :align="align" prop="resVote" label="剩余票量" width="80"></el-table-column>
      <el-table-column :align="align" sortable prop="date" label="出发时间" :formatter="outTime"></el-table-column>
      <el-table-column :align="align" sortable prop="date" label="抵达时间" :formatter="overTime"></el-table-column>
      <el-table-column :align="align" prop="outCity" label="出发城市"></el-table-column>
      <el-table-column :align="align" prop="overCity" label="抵达城市"></el-table-column>
      <el-table-column :align="align" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑车票" :visible.sync="dialogFormVisible">
      <el-form ref="editForm" :rules="rules" :model="editForm">
        <el-form-item label="票价(元)" prop="price">
          <el-input type="number" v-model.number="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="票价折扣(如七折)" prop="disCount">
          <el-input type="number" v-model.number="editForm.disCount"></el-input>
        </el-form-item>
        <el-form-item label="剩余票量" prop="resVote">
          <el-input type="number" v-model.number="editForm.resVote"></el-input>
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
import { getTic } from "api/gettic";
import { editTic, delTic } from "api/addtic";
import { ERR_OK } from "common/js/config";

export default {
  data() {
    let checkDis = (rule, value, callback) => {
      if (value > 10 || value < 1) {
        callback(new Error("请输入有效数字，折扣应该在1-10之间"));
      } else {
        callback();
      }
    };
    return {
      ticDatas: [],
      align: "center",
      dialogFormVisible: false,
      editForm: {},
      rules: {
        price: [{ type: "number", message: "票价必须为数字", trigger: "blur" }],
        disCount: [
          { type: "number", message: "票价折扣必须为数字", trigger: "blur" },
          { validator: checkDis, trigger: "blur" }
        ],
        resVote: [
          { type: "number", message: "剩余票量必须为数字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this._getTic();
  },
  methods: {
    _getTic() {
      getTic().then(res => {
        if (res.status === ERR_OK) {
          this.ticDatas = res.data;
        }
      });
    },
    outTime(row) {
      return row.date[0];
    },
    overTime(row) {
      return row.date[1];
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
    _editTic(editForm) {
      editTic(editForm).then(res => {
        if (res.data.code === ERR_OK) {
          this._resetForm("editForm");
          this._getTic();
          this._successMes("编辑成功");
        }
      });
    },
    _deltic(id) {
      delTic(id).then(res => {
        if (res.data.code === ERR_OK) {
          this._successMes("删除成功");
          this._getTic();
        }
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editForm.id = row._id;
    },
    handleDelete(index, row) {
      this._deltic(row._id);
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this._resetForm("editForm");
      this._warnMes("您取消了编辑");
    },
    handlePrimary() {
      this.dialogFormVisible = false;
      if (
        this.editForm.price ||
        this.editForm.disCount ||
        this.editForm.resVote
      ) {
        console.log(this.editForm);
        this._editTic(this.editForm);
      }
    }
  }
};
</script>
