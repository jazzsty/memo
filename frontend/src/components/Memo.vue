<!-- eslint-disable no-undef -->
<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add()">+ 추가</button>
    </div>
    <ul>
      <li v-for="item in state.data" :key="item.id" @click="edit(item.id)">{{ item.content }}</li>
    </ul>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import axiosInstance from '@/axios-config';

export default {
  setup() {
    const state = reactive({
      data: []
    });

    const edit = async (id) => {
      console.log("check step edit() id: ", id);

      const memo = state.data.find((item) => item.id === id);
      if (memo) {
        const content = prompt("내용을 입력해주세요", memo.content);
        console.log("content: ", content);
        await axios.put(`/api/memos/${id}`, { content: content }).then((res) => {
          console.log("res.data.result: ", res.data.result);
          state.data = res.data.result;
        })
          .catch((err) => {
            console.error('Error: ', err.response.data);
        })
      } else {
        console.error("Memo not found");
      }
    }

    const add = async () => {
      console.log("check step add()");

      // 사용자 입력 받기
      const content = prompt("내용을 입력해주세요.");
       // 입력값 검증
      if (!content || content.trim() === "") {
        console.warn("내용이 입력되지 않았습니다.");
        alert("내용을 입력해주세요.");
        return;
      }
      try {
        console.log("content: ", content);

        // 서버에 POST 요청
        const response = await axios.post("/api/memos", { content });
        console.log("서버 응답 데이터:", response.data.result);

        // 상태 데이터 업데이트
        state.data = response.data.result;
      } catch (error) {
        console.error("메모 추가 중 오류 발생:", error);
        alert("메모를 추가하는 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }

    const load = async () => {
      try {
        console.log("Fetching memos from the server...");
        
        // 서버에서 데이터 요청
        // const response = await axios.get("/memo/api/memos");
        const response = await axiosInstance.get("/memos");
        console.log("서버 응답 데이터:", response.data);

        // 응답 구조 검증 및 상태 업데이트
        if (response.data && response.data.result) {
          state.data = response.data.result;
          console.log("메모 데이터 로드 완료:", state.data);
        } else {
          console.error("응답 데이터가 예상과 다릅니다:", response.data);
          alert("메모 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("메모 데이터 로드 중 오류 발생:", error);
        alert("메모 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    };

    // load();
     // 로드 함수 실행
    onMounted(() => {
      load();
    });

    return { state, add, edit, load }
  }
}
</script>
<style scoped>
.memo {
  .act {
    text-align: right;
    padding: 10px 10px 5px 5px;
  }

  ul {
    border: 1px solid #eee;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 15px;
    margin: 10px 0;
    border: 1px solid #eee;
    cursor: pointer;
  }
}
</style>