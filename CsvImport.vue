<script setup lang="ts">
import { ref } from 'vue';

const selectedFile = ref<File | null>(null);

const cart = useCart();
const imoortList = ref<Api.Response.CsvImport.ListItem[]>([])

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFile.value = target.files[0];
  }
};

const uploadFile = async() => {
  if (selectedFile.value) {
    let formData = new FormData();
    formData.append('csv_file', selectedFile.value);

    const res = await useApi<Api.Response.CsvImport.List>(    
      '/api/v1/order_request/csv_import',
      formData,
      'POST'
    );

    if (res.status == 200) {
      imoortList.value = res.data.data
    } 
  }
};

const addToCart = () => {
  for(let i: number = 0; i < imoortList.value.length; i++){
    if (imoortList.value[i].validation_result) {
      cart.pushCart(imoortList.value[i].cart_item);
    }
  }
  imoortList.value = [];
  selectedFile.value = null;
}

</script>


<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadFile">取込</button>
  </div>

  <div v-if="imoortList.length>0">
    <table>
      <tr>
        <th>LineNo</th>
        <th>状態</th>
        <th>商品</th>
        <th>数量</th>
        <th>エラー</th>
      </tr>
      <tbody>
        <tr v-for="(item, index) in imoortList" :key="index">
          <td width="120">{{ item.line_no }}</td>
          <td width="120">{{ item.validation_result ? 'OK' : 'NG' }}</td>
          <td width="120">{{ item.cart_item.shohin_cd }}</td>
          <td width="120">{{ item.cart_item.suryo2 }}</td>
          <td width="120">{{ item.validation_error }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="addToCart">カートへ追加</button>
    </div>
  </div>

</template>