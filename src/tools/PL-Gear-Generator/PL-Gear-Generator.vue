<script lang="ts">
export default {
  data() {
    return {
      acProfiles: [
        { title: 'Profile 0', PL1: 15, PL2: 20 },
        { title: 'Profile 1', PL1: 15, PL2: 20 },
        { title: 'Profile 2', PL1: 15, PL2: 20 },
        { title: 'Profile 3', PL1: 15, PL2: 20 },
        { title: 'Profile 4', PL1: 15, PL2: 20 },
        { title: 'Profile 5', PL1: 15, PL2: 20 },
        { title: 'Profile 6', PL1: 15, PL2: 20 },
        { title: 'Profile 7', PL1: 15, PL2: 20 },
        { title: 'Profile 8', PL1: 0, PL2: 0 },
      ],
      dcProfiles: [
        { title: 'Profile 0', PL1: 15, PL2: 20 },
        { title: 'Profile 1', PL1: 15, PL2: 20 },
        { title: 'Profile 2', PL1: 15, PL2: 20 },
        { title: 'Profile 3', PL1: 15, PL2: 20 },
        { title: 'Profile 4', PL1: 15, PL2: 20 },
        { title: 'Profile 5', PL1: 15, PL2: 20 },
        { title: 'Profile 6', PL1: 15, PL2: 20 },
        { title: 'Profile 7', PL1: 15, PL2: 20 },
        { title: 'Profile 8', PL1: 0, PL2: 0 },
      ],
      inputValue: '',
      numberOfGears: 9,
      checkedValue: 'CPU Profile',
    };
  },
  methods: {
    async parseInput(inputValue: string) {
      const regex = /Write_REG_PowerSlider_DWORD\("Policy_(\w+)(\d+)",\s(0x[\da-fA-F]{8})\)/g;
      let matches = regex.exec(inputValue);
      while (matches !== null) {
        const [match, profileTitle, profileIndex, hexValue] = matches;
        let adjustedProfileIndex;
        if (profileTitle === 'CPUProfile') {
          adjustedProfileIndex = parseInt(profileIndex, 10);
        } else if (profileTitle === 'AIProfile') {
          adjustedProfileIndex = parseInt(profileIndex, 10);
        }
        const dcPL2 = parseInt(hexValue.substr(2, 2), 16);
        const dcPL1 = parseInt(hexValue.substr(4, 2), 16);
        const acPL2 = parseInt(hexValue.substr(6, 2), 16);
        const acPL1 = parseInt(hexValue.substr(8, 2), 16);

        if (this.acProfiles[profileIndex]) {
          this.acProfiles[profileIndex].PL1 = acPL1;
          this.acProfiles[profileIndex].PL2 = acPL2;
        }

        if (this.dcProfiles[profileIndex]) {
          this.dcProfiles[profileIndex].PL1 = dcPL1;
          this.dcProfiles[profileIndex].PL2 = dcPL2;
        }

        if (profileTitle.includes('CPU') || profileTitle.includes('AI')) {
          this.checkedValue = profileTitle.includes('CPU') ? 'CPU Profile' : 'AI Profile';
        }

        matches = regex.exec(inputValue);
      }
    },
    generateText() {
      const { acProfiles, dcProfiles, checkedValue } = this;
      const textArr = [];
  
      for (let i = 0; i < acProfiles.length; i++) {
        const acPL1 = acProfiles[i].PL1;
        const acPL2 = acProfiles[i].PL2;
        const dcPL1 = dcProfiles[i].PL1;
        const dcPL2 = dcProfiles[i].PL2;
  
        if (acPL1 !== 0 && acPL2 !== 0 && dcPL1 !== 0 && dcPL2 !== 0) {
          const hexValue = [
            dcPL2.toString(16).padStart(2, '0'), // DC PL2的十六进制值（2位）
            dcPL1.toString(16).padStart(2, '0'), // DC PL1的十六进制值（2位）
            acPL2.toString(16).padStart(2, '0'), // AC PL2的十六进制值（2位）
            acPL1.toString(16).padStart(2, '0'), // AC PL1的十六进制值（2位）
          ].join('');
    
          const profileText = checkedValue === 'CPU Profile' ? `CPUProfile${i}` : `AIProfile1${i}`;
          const text = `Write_REG_PowerSlider_DWORD("Policy_${profileText}", 0x${hexValue});`;
          textArr.push(text);
        }
      }
  
      const allText = textArr.join('\n');
      this.inputValue = allText;
    },
    updateCheckedValue(event: Event) {
      this.checkedValue = (event.target as HTMLInputElement).value;
      this.generateText();
    },
  },
};
</script>

<template>
    <n-card title="DC">
    <n-grid :cols="5" y-gap="5">
      <template v-for="profile in dcProfiles" :key="profile.title">
        <n-gi class="profile-title-grid">
          <div class="profile-text">{{ profile.title }}</div>
        </n-gi>
        <n-gi :span="2">
          <n-form :model="profile">
            <n-form-item label="PL1" label-placement="left" label-width="50" :show-feedback="false">
              <n-input-number v-model:value="profile.PL1" max="150" min="8" placeholder="Enter PL1 value" @update:value="generateText"/>
            </n-form-item>
          </n-form>
        </n-gi>
        <n-gi :span="2">
          <n-form :model="profile">
            <n-form-item label="PL2" label-placement="left" label-width="50" :show-feedback="false">
              <n-input-number v-model:value="profile.PL2" max="150" min="8" placeholder="Enter PL2 value" @update:value="generateText"/>
            </n-form-item>
          </n-form>
        </n-gi>
      </template>
    </n-grid>
  </n-card>
  <n-card title="AC">
    <n-grid :cols="5" y-gap="5">
      <template v-for="profile in acProfiles" :key="profile.title">
        <n-gi class="profile-title-grid">
          <div class="profile-text">{{ profile.title }}</div>
        </n-gi>
        <n-gi :span="2">
          <n-form :model="profile">
            <n-form-item label="PL1" label-placement="left" label-width="50" :show-feedback="false">
              <n-input-number v-model:value="profile.PL1" max="150" min="8" placeholder="Enter PL1 value" @update:value="generateText"/>
            </n-form-item>
          </n-form>
        </n-gi>
        <n-gi :span="2">
          <n-form :model="profile">
            <n-form-item label="PL2" label-placement="left" label-width="50" :show-feedback="false">
              <n-input-number v-model:value="profile.PL2" max="150" min="8" placeholder="Enter PL2 value" @update:value="generateText"/>
            </n-form-item>
          </n-form>
        </n-gi>
      </template>
    </n-grid>
  </n-card>
  <n-card title="Configuration">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <h4>Choose the type of profile:</h4>
        <n-space>
          <n-radio
            :checked="checkedValue === 'CPU Profile'"
            value="CPU Profile"
            name="Profile Type"
            @change="updateCheckedValue"
          >
            CPU Profile
          </n-radio>
          <n-radio
            :checked="checkedValue === 'AI Profile'"
            value="AI Profile"
            name="Profile Type"
            @change="updateCheckedValue"
          >
            AI Profile
          </n-radio>
        </n-space>
      </n-gi>
      <n-gi>
        <h4>Select a PL data collection:</h4>
        <n-space vertical>
          <n-select options="123"></n-select>
        </n-space>
      </n-gi>
    </n-grid>
  </n-card>
  <n-card title="Result">
    <template #header-extra>
      <n-button quaternary circle>
      <template #icon>
        <n-icon icon="el-icon-copy"></n-icon>
      </template>
    </n-button>
    </template>
    <n-space vertical>
      <n-input
        v-model:value="inputValue"
        type="textarea"
        placeholder="Copy and paste your Registery value here..."
        :autosize="{
          minRows: 10,
          maxRows: 10,
        }"
        @input="parseInput"
      />
    </n-space>
  </n-card>
</template>

<style lang="less" scoped>
.profile-title-grid {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.profile-text {
  display: flex;
}
</style>
