<template>
  <div class="addtic">
    <el-form
      :model="ticMes"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
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
      <el-form-item label="总票量" prop="totAmount">
        <el-input type="number" v-model.number="ticMes.totAmount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    {{ticMes.disCount}}
  </div>
</template>

<script>
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
        name: "",
        ticId: "",
        price: "",
        disCount: "",
        totAmount: ""
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
        totAmount: [
          { required: true, message: "请输入总票量", trigger: "blur" },
          { type: "number", message: "总票量必须为数字", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>
