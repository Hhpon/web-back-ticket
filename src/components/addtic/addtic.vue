<template>
  <div class="addtic">
    <el-form
      :model="ticMes"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="车次" prop="ticId">
        <el-input v-model="ticMes.ticId"></el-input>
      </el-form-item>
      <el-form-item label="票价(元)" prop="price">
        <el-input type="number" v-model.number="ticMes.price"></el-input>
      </el-form-item>
      <el-form-item label="票价折扣(如七折)" prop="disCount">
        <el-input type="number" v-model.number="ticMes.disCount"></el-input>
      </el-form-item>
      <el-form-item label="总票量" prop="totalVote">
        <el-input type="number" v-model.number="ticMes.totalVote"></el-input>
      </el-form-item>
      <el-form-item label="车次时间" prop="date">
        <el-date-picker
          v-model="ticMes.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :value-format="dateFormat"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="出发城市" prop="outCity">
        <v-distpicker @selected="selectedOut"></v-distpicker>
      </el-form-item>
      <el-form-item label="抵达城市" prop="overCity">
        <v-distpicker @selected="selectedOver"></v-distpicker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import { addTic } from "api/addtic";
import { ERR_OK } from "common/js/config";

export default {
  data() {
    let checkDis = (rule, value, callback) => {
      if (value > 10 || value < 1) {
        callback(new Error("请输入有效数字"));
      } else {
        callback();
      }
    };
    return {
      ticMes: {
        ticId: "",
        price: '',
        disCount: '',
        totalVote: '',
        date: ["2019-03-16 00:00", "2019-03-17 00:00"],
        outCity: { province: "", city: "", area: "" },
        overCity: { province: "", city: "", area: "" }
      },
      rules: {
        ticId: [{ required: true, message: "请输入车次号", trigger: "blur" }],
        price: [
          { required: true, message: "请输入票价", trigger: "blur" },
          { type: "number", message: "票价必须为数字", trigger: "blur" }
        ],
        disCount: [
          { required: true, message: "请输入票价折扣", trigger: "blur" },
          { type: "number", message: "票价折扣必须为数字", trigger: "blur" },
          { validator: checkDis, trigger: "blur" }
        ],
        totalVote: [
          { required: true, message: "请输入总票量", trigger: "blur" },
          { type: "number", message: "总票量必须为数字", trigger: "blur" }
        ],
        date: [{ required: true, message: "请输入车次时间", trigger: "blur" }],
        outCity: [
          { required: true, message: "请输入出发城市", trigger: "blur" }
        ],
        overCity: [
          { required: true, message: "请输入抵达城市", trigger: "blur" }
        ]
      },
      dateFormat: "yyyy-MM-dd HH:mm"
    };
  },
  methods: {
    submitForm(formName) {
      if (
        !this.ticMes.outCity.province ||
        !this.ticMes.outCity.city ||
        !this.ticMes.outCity.area
      ) {
        this._openLose("请输入完整的出发城市");
        return;
      } else if (
        !this.ticMes.overCity.province ||
        !this.ticMes.overCity.city ||
        !this.ticMes.overCity.area
      ) {
        this._openLose("请输入完整的抵达城市");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          addTic(this.ticMes).then(res => {
            if (res.data.code === ERR_OK) {
              this._openSuccess();
              this._resetForm(formName);
            } else {
              this._openLose("车票添加失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectedOut(data) {
      this.ticMes.outCity.province = data.province.value;
      this.ticMes.outCity.city = data.city.value;
      this.ticMes.outCity.area = data.area.value;
    },
    selectedOver(data) {
      this.ticMes.overCity.province = data.province.value;
      this.ticMes.overCity.city = data.city.value;
      this.ticMes.overCity.area = data.area.value;
    },
    _openSuccess() {
      this.$message({
        message: "车票添加成功",
        type: "success"
      });
    },
    _openLose(message) {
      this.$message.error(message);
    }
  },
  components: {
    VDistpicker
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>
