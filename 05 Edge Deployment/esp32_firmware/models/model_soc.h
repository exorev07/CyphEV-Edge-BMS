// Auto-generated XGBoost model for ESP32
// Model: soc
#ifndef MODEL_SOC_H
#define MODEL_SOC_H

#define SOC_N_BASE_FEATURES 22
#define SOC_N_TREES 100
#define SOC_BASE_SCORE 0.500000f

static const float soc_scaler_mean[22] = {
  379.39960538f, -19.38524407f, -7131.61736097f, 46.58065609f, 0.00687321f, 10.87728530f, 18.01565205f, 16.95003124f, 1428.99590168f, 51.20236368f, -109.71166378f, 31.15893478f, 12.06264791f, 19846.24595767f, 370.37834993f, -5.52757022f, -2042.24164890f, 12.34912567f, 996.27768313f, -0.02290124f, 1.06562081f, 0.36073254f
};
static const float soc_scaler_scale[22] = {
  8.34737752f, 19.57571842f, 7066.10674819f, 30.06688988f, 0.20087520f, 11.43504447f, 7.06353471f, 10.29162945f, 2004.47292892f, 37.10716903f, 80.40605829f, 21.90416133f, 7.59539661f, 14438.41516777f, 13.27772396f, 5.52472814f, 1995.08712706f, 11.78270787f, 767.23620312f, 3.89210164f, 4.55982407f, 0.48021305f
};

static inline float soc_tree0(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.25105625f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.09537673f) ? 2 : 9; break;
      case 2: node = (f[20] < 1.62516415f) ? 3 : 6; break;
      case 3: node = (f[2] < -0.89725965f) ? 4 : 5; break;
      case 4: return -0.59291583f;
      case 5: return -1.35147178f;
      case 6: node = (f[0] < -1.67084479f) ? 7 : 8; break;
      case 7: return -2.31845617f;
      case 8: return -1.47373056f;
      case 9: node = (f[2] < -0.56259906f) ? 10 : 13; break;
      case 10: node = (f[17] < 0.31946886f) ? 11 : 12; break;
      case 11: return 0.33031058f;
      case 12: return -0.21273796f;
      case 13: node = (f[0] < -0.30761424f) ? 14 : 15; break;
      case 14: return -0.65266919f;
      case 15: return -0.29055151f;
      case 16: node = (f[0] < 0.95866770f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.34415704f) ? 18 : 21; break;
      case 18: node = (f[0] < 0.47163650f) ? 19 : 20; break;
      case 19: return 0.43015560f;
      case 20: return 0.76875711f;
      case 21: node = (f[0] < 0.61895824f) ? 22 : 23; break;
      case 22: return 0.05468507f;
      case 23: return 0.53064126f;
      case 24: node = (f[15] < 0.35865974f) ? 25 : 28; break;
      case 25: node = (f[5] < -2.00141788f) ? 26 : 27; break;
      case 26: return 0.41146299f;
      case 27: return 0.75113857f;
      case 28: return 1.15998590f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree1(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.78134382f) ? 1 : 14; break;
      case 1: node = (f[20] < 1.52075589f) ? 2 : 9; break;
      case 2: node = (f[19] < 1.98478401f) ? 3 : 6; break;
      case 3: node = (f[1] < -0.72806895f) ? 4 : 5; break;
      case 4: return -0.60879916f;
      case 5: return -1.12278867f;
      case 6: node = (f[15] < -0.74155015f) ? 7 : 8; break;
      case 7: return -0.04663771f;
      case 8: return 0.26442662f;
      case 9: node = (f[7] < -1.30770004f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.71007681f) ? 11 : 12; break;
      case 11: return -0.75205272f;
      case 12: return -1.37636364f;
      case 13: return -2.05941248f;
      case 14: node = (f[0] < 0.48355243f) ? 15 : 22; break;
      case 15: node = (f[1] < -0.24991876f) ? 16 : 19; break;
      case 16: node = (f[7] < 0.04195036f) ? 17 : 18; break;
      case 17: return 0.44586372f;
      case 18: return 0.09116588f;
      case 19: node = (f[0] < 0.27369341f) ? 20 : 21; break;
      case 20: return -0.36342382f;
      case 21: return 0.07766357f;
      case 22: node = (f[0] < 1.00172114f) ? 23 : 26; break;
      case 23: node = (f[1] < 0.33203092f) ? 24 : 25; break;
      case 24: return 0.74703014f;
      case 25: return 0.44560367f;
      case 26: node = (f[18] < 0.07002057f) ? 27 : 28; break;
      case 27: return 1.08354890f;
      case 28: return 0.65834189f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree2(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.74684000f) ? 1 : 10; break;
      case 1: node = (f[17] < 2.60604978f) ? 2 : 9; break;
      case 2: node = (f[2] < -0.74390572f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.62001443f) ? 4 : 5; break;
      case 4: return -0.87105084f;
      case 5: return -0.21362789f;
      case 6: node = (f[0] < -1.09537673f) ? 7 : 8; break;
      case 7: return -1.31017947f;
      case 8: return -0.65596485f;
      case 9: return -2.05770874f;
      case 10: node = (f[0] < 0.50796127f) ? 11 : 18; break;
      case 11: node = (f[2] < -0.17041294f) ? 12 : 15; break;
      case 12: node = (f[0] < -0.04992451f) ? 13 : 14; break;
      case 13: return 0.07550201f;
      case 14: return 0.43782860f;
      case 15: node = (f[0] < 0.25105625f) ? 16 : 17; break;
      case 16: return -0.33970445f;
      case 17: return 0.05870599f;
      case 18: node = (f[0] < 0.98149323f) ? 19 : 22; break;
      case 19: node = (f[2] < 0.29482254f) ? 20 : 21; break;
      case 20: return 0.69444960f;
      case 21: return 0.41740498f;
      case 22: node = (f[15] < 0.37039655f) ? 23 : 24; break;
      case 23: return 0.62825555f;
      case 24: return 0.99428159f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree3(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.25105625f) ? 1 : 14; break;
      case 1: node = (f[0] < -1.09537673f) ? 2 : 7; break;
      case 2: node = (f[17] < 2.71642470f) ? 3 : 6; break;
      case 3: node = (f[1] < -0.32915384f) ? 4 : 5; break;
      case 4: return -0.73102844f;
      case 5: return -1.22149003f;
      case 6: return -1.92077327f;
      case 7: node = (f[1] < -0.54010224f) ? 8 : 11; break;
      case 8: node = (f[19] < 0.27052254f) ? 9 : 10; break;
      case 9: return 0.06310294f;
      case 10: return 0.41078067f;
      case 11: node = (f[0] < -0.30761424f) ? 12 : 13; break;
      case 12: return -0.54130513f;
      case 13: return -0.22981080f;
      case 14: node = (f[0] < 0.91414672f) ? 15 : 22; break;
      case 15: node = (f[6] < -1.22123706f) ? 16 : 19; break;
      case 16: node = (f[16] < 0.25387835f) ? 17 : 18; break;
      case 17: return 0.45283786f;
      case 18: return 0.77022678f;
      case 19: node = (f[3] < -0.53669244f) ? 20 : 21; break;
      case 20: return 0.09188117f;
      case 21: return 0.38670105f;
      case 22: node = (f[16] < 0.35837525f) ? 23 : 26; break;
      case 23: node = (f[16] < 0.05346943f) ? 24 : 25; break;
      case 24: return 0.38573462f;
      case 25: return 0.63388294f;
      case 26: return 0.90684962f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree4(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.61860609f) ? 1 : 10; break;
      case 1: node = (f[17] < 2.40439749f) ? 2 : 9; break;
      case 2: node = (f[19] < 1.98478401f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.16400492f) ? 4 : 5; break;
      case 4: return -0.99496525f;
      case 5: return -0.54052299f;
      case 6: node = (f[16] < -0.65355265f) ? 7 : 8; break;
      case 7: return 0.04376543f;
      case 8: return 0.32057503f;
      case 9: return -1.75532699f;
      case 10: node = (f[0] < 0.48355243f) ? 11 : 18; break;
      case 11: node = (f[1] < -0.06598681f) ? 12 : 15; break;
      case 12: node = (f[1] < -1.69070542f) ? 13 : 14; break;
      case 13: return 0.57912391f;
      case 14: return 0.13797855f;
      case 15: node = (f[0] < 0.27369341f) ? 16 : 17; break;
      case 16: return -0.28162429f;
      case 17: return 0.02130180f;
      case 18: node = (f[0] < 0.95866770f) ? 19 : 22; break;
      case 19: node = (f[6] < -1.22123706f) ? 20 : 21; break;
      case 20: return 0.68375427f;
      case 21: return 0.36836487f;
      case 22: node = (f[17] < -0.56972516f) ? 23 : 24; break;
      case 23: return 0.85692579f;
      case 24: return 0.58778816f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree5(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.88590580f) ? 1 : 16; break;
      case 1: node = (f[20] < 1.57747960f) ? 2 : 9; break;
      case 2: node = (f[10] < 0.08620822f) ? 3 : 6; break;
      case 3: node = (f[1] < -2.26078248f) ? 4 : 5; break;
      case 4: return -0.06328756f;
      case 5: return -0.53839177f;
      case 6: node = (f[8] < 0.05653395f) ? 7 : 8; break;
      case 7: return -1.05334294f;
      case 8: return -0.53792363f;
      case 9: node = (f[0] < -1.67084479f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.71007681f) ? 11 : 12; break;
      case 11: return -0.92425322f;
      case 12: return -1.69793046f;
      case 13: node = (f[6] < -0.84230620f) ? 14 : 15; break;
      case 14: return -0.54161936f;
      case 15: return -1.06342554f;
      case 16: node = (f[0] < 0.50796127f) ? 17 : 24; break;
      case 17: node = (f[1] < -0.46858081f) ? 18 : 21; break;
      case 18: node = (f[15] < -0.30478972f) ? 19 : 20; break;
      case 19: return -0.07473591f;
      case 20: return 0.33278644f;
      case 21: node = (f[0] < 0.27369341f) ? 22 : 23; break;
      case 22: return -0.26489341f;
      case 23: return 0.09729499f;
      case 24: node = (f[0] < 0.97604245f) ? 25 : 28; break;
      case 25: node = (f[1] < 0.33203092f) ? 26 : 27; break;
      case 26: return 0.55100656f;
      case 27: return 0.30707613f;
      case 28: node = (f[18] < 0.07002057f) ? 29 : 30; break;
      case 29: return 0.77216214f;
      case 30: return 0.48273590f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree6(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.32362524f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.16400492f) ? 2 : 9; break;
      case 2: node = (f[20] < 1.37085974f) ? 3 : 6; break;
      case 3: node = (f[19] < 1.98478401f) ? 4 : 5; break;
      case 4: return -0.71594155f;
      case 5: return 0.14656119f;
      case 6: node = (f[0] < -1.75189614f) ? 7 : 8; break;
      case 7: return -1.49365282f;
      case 8: return -0.96499884f;
      case 9: node = (f[1] < -0.76239210f) ? 10 : 13; break;
      case 10: node = (f[19] < 0.14205724f) ? 11 : 12; break;
      case 11: return -0.09159151f;
      case 12: return 0.36618796f;
      case 13: node = (f[8] < 0.05072194f) ? 14 : 15; break;
      case 14: return -0.52162015f;
      case 15: return -0.17352869f;
      case 16: node = (f[0] < 0.62677103f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.21155870f) ? 18 : 21; break;
      case 18: node = (f[7] < 0.00780823f) ? 19 : 20; break;
      case 19: return 0.39557639f;
      case 20: return 0.08816774f;
      case 21: node = (f[7] < 0.15060480f) ? 22 : 23; break;
      case 22: return 0.05411634f;
      case 23: return -0.21445550f;
      case 24: node = (f[15] < 0.42421880f) ? 25 : 28; break;
      case 25: node = (f[16] < 0.05346943f) ? 26 : 27; break;
      case 26: return 0.29067463f;
      case 27: return 0.46380985f;
      case 28: node = (f[6] < 1.29833698f) ? 29 : 30; break;
      case 29: return 0.69100660f;
      case 30: return 0.14722346f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree7(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[14] < 0.31343099f) ? 1 : 16; break;
      case 1: node = (f[20] < 1.62516415f) ? 2 : 9; break;
      case 2: node = (f[17] < -0.20870225f) ? 3 : 6; break;
      case 3: node = (f[11] < -0.29417503f) ? 4 : 5; break;
      case 4: return -0.25440761f;
      case 5: return 0.16207308f;
      case 6: node = (f[11] < -0.37375766f) ? 7 : 8; break;
      case 7: return -0.57784075f;
      case 8: return -0.23720139f;
      case 9: node = (f[7] < -1.32043695f) ? 10 : 13; break;
      case 10: node = (f[20] < 1.74539542f) ? 11 : 12; break;
      case 11: return -0.34529936f;
      case 12: return -0.79468113f;
      case 13: node = (f[17] < 0.43563834f) ? 14 : 15; break;
      case 14: return -1.03156388f;
      case 15: return -1.37751889f;
      case 16: node = (f[14] < 0.78037846f) ? 17 : 24; break;
      case 17: node = (f[1] < 0.50131208f) ? 18 : 21; break;
      case 18: node = (f[17] < 0.35065708f) ? 19 : 20; break;
      case 19: return 0.37919277f;
      case 20: return -0.00643194f;
      case 21: node = (f[17] < 0.72724152f) ? 22 : 23; break;
      case 22: return 0.04901418f;
      case 23: return -0.29770940f;
      case 24: node = (f[15] < 0.07892539f) ? 25 : 28; break;
      case 25: node = (f[17] < 0.99750614f) ? 26 : 27; break;
      case 26: return 0.26125708f;
      case 27: return 0.01763353f;
      case 28: node = (f[14] < 1.11723888f) ? 29 : 30; break;
      case 29: return 0.51386255f;
      case 30: return 0.65351492f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree8(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.41632262f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.09537673f) ? 2 : 9; break;
      case 2: node = (f[1] < -0.55966812f) ? 3 : 6; break;
      case 3: node = (f[19] < 1.59628439f) ? 4 : 5; break;
      case 4: return -0.52788776f;
      case 5: return 0.13985005f;
      case 6: node = (f[0] < -1.86658084f) ? 7 : 8; break;
      case 7: return -1.33078659f;
      case 8: return -0.80790627f;
      case 9: node = (f[19] < 0.97965097f) ? 10 : 13; break;
      case 10: node = (f[1] < -1.34212899f) ? 11 : 12; break;
      case 11: return 0.00526258f;
      case 12: return -0.41080493f;
      case 13: node = (f[13] < -0.93963110f) ? 14 : 15; break;
      case 14: return 0.39471710f;
      case 15: return 0.07385760f;
      case 16: node = (f[0] < 0.62677103f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.09598769f) ? 18 : 21; break;
      case 18: node = (f[18] < -0.55560166f) ? 19 : 20; break;
      case 19: return 0.35575572f;
      case 20: return 0.08829267f;
      case 21: node = (f[0] < 0.38319355f) ? 22 : 23; break;
      case 22: return -0.18966045f;
      case 23: return 0.05694246f;
      case 24: node = (f[15] < 0.42421880f) ? 25 : 28; break;
      case 25: node = (f[8] < -0.23167981f) ? 26 : 27; break;
      case 26: return 0.37489131f;
      case 27: return 0.21227510f;
      case 28: node = (f[0] < 0.73845339f) ? 29 : 30; break;
      case 29: return 0.32736972f;
      case 30: return 0.61108071f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree9(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.42804927f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.09537673f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.84230620f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.51717591f) ? 4 : 5; break;
      case 4: return -0.59015423f;
      case 5: return 0.00379235f;
      case 6: node = (f[7] < 0.11655609f) ? 7 : 8; break;
      case 7: return -1.00858676f;
      case 8: return -0.16605139f;
      case 9: node = (f[19] < 0.92826486f) ? 10 : 13; break;
      case 10: node = (f[1] < -1.37413979f) ? 11 : 12; break;
      case 11: return 0.05662628f;
      case 12: return -0.38475025f;
      case 13: node = (f[9] < -0.93950480f) ? 14 : 15; break;
      case 14: return 0.35707912f;
      case 15: return 0.04939740f;
      case 16: node = (f[0] < 0.48355243f) ? 17 : 24; break;
      case 17: node = (f[1] < -0.03987409f) ? 18 : 21; break;
      case 18: node = (f[6] < -1.22123706f) ? 19 : 20; break;
      case 19: return 0.50524938f;
      case 20: return 0.10785478f;
      case 21: node = (f[7] < 0.15060480f) ? 22 : 23; break;
      case 22: return 0.04838319f;
      case 23: return -0.19766882f;
      case 24: node = (f[0] < 0.91414672f) ? 25 : 28; break;
      case 25: node = (f[1] < 0.32868239f) ? 26 : 27; break;
      case 26: return 0.41101053f;
      case 27: return 0.18261667f;
      case 28: node = (f[15] < 0.15178488f) ? 29 : 30; break;
      case 29: return 0.25832742f;
      case 30: return 0.55404383f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree10(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.85382170f) ? 1 : 16; break;
      case 1: node = (f[20] < 1.62516415f) ? 2 : 9; break;
      case 2: node = (f[1] < -1.00092733f) ? 3 : 6; break;
      case 3: node = (f[19] < 2.48526430f) ? 4 : 5; break;
      case 4: return -0.22263020f;
      case 5: return 0.20701732f;
      case 6: node = (f[8] < 0.09277789f) ? 7 : 8; break;
      case 7: return -0.65748811f;
      case 8: return -0.16306996f;
      case 9: node = (f[0] < -1.67084479f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.71007681f) ? 11 : 12; break;
      case 11: return -0.60914153f;
      case 12: return -1.15324140f;
      case 13: node = (f[15] < 0.18265779f) ? 14 : 15; break;
      case 14: return -0.38398251f;
      case 15: return -0.75699711f;
      case 16: node = (f[0] < 0.57526672f) ? 17 : 24; break;
      case 17: node = (f[6] < -1.13900042f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.25058153f) ? 19 : 20; break;
      case 19: return -0.02244244f;
      case 20: return 0.40479749f;
      case 21: node = (f[1] < -1.22715998f) ? 22 : 23; break;
      case 22: return 0.31890711f;
      case 23: return -0.11297263f;
      case 24: node = (f[15] < 0.15497151f) ? 25 : 28; break;
      case 25: node = (f[8] < -0.30372700f) ? 26 : 27; break;
      case 26: return 0.25993836f;
      case 27: return 0.15803604f;
      case 28: node = (f[0] < 0.73845339f) ? 29 : 30; break;
      case 29: return 0.26031220f;
      case 30: return 0.49409813f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree11(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[14] < 0.31343099f) ? 1 : 16; break;
      case 1: node = (f[20] < 1.62516415f) ? 2 : 9; break;
      case 2: node = (f[10] < 0.20311484f) ? 3 : 6; break;
      case 3: node = (f[15] < 0.15497151f) ? 4 : 5; break;
      case 4: return -0.14055696f;
      case 5: return 0.14574814f;
      case 6: node = (f[14] < -0.17771494f) ? 7 : 8; break;
      case 7: return -0.56206858f;
      case 8: return -0.21324070f;
      case 9: node = (f[6] < -0.77742034f) ? 10 : 13; break;
      case 10: node = (f[9] < 1.11265934f) ? 11 : 12; break;
      case 11: return -0.40686351f;
      case 12: return -0.08367293f;
      case 13: node = (f[17] < 0.51680172f) ? 14 : 15; break;
      case 14: return -0.73204857f;
      case 15: return -1.06202590f;
      case 16: node = (f[15] < -0.00321686f) ? 17 : 24; break;
      case 17: node = (f[17] < 1.09713316f) ? 18 : 21; break;
      case 18: node = (f[6] < 1.55507803f) ? 19 : 20; break;
      case 19: return 0.12775949f;
      case 20: return -0.16508371f;
      case 21: node = (f[3] < 0.65172136f) ? 22 : 23; break;
      case 22: return -0.24316795f;
      case 23: return -0.02451871f;
      case 24: node = (f[14] < 0.78037846f) ? 25 : 28; break;
      case 25: node = (f[1] < 0.53166598f) ? 26 : 27; break;
      case 26: return 0.29948443f;
      case 27: return -0.00769317f;
      case 28: node = (f[6] < 1.41350591f) ? 29 : 30; break;
      case 29: return 0.42219427f;
      case 30: return 0.00385093f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree12(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.82331109f) ? 1 : 14; break;
      case 1: node = (f[2] < -0.51574838f) ? 2 : 7; break;
      case 2: node = (f[19] < 1.59628439f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.44532883f) ? 4 : 5; break;
      case 4: return -0.46428061f;
      case 5: return -0.12674649f;
      case 6: return 0.19994357f;
      case 7: node = (f[0] < -1.75189614f) ? 8 : 11; break;
      case 8: node = (f[6] < -0.84230620f) ? 9 : 10; break;
      case 9: return -0.58222687f;
      case 10: return -1.05804288f;
      case 11: node = (f[6] < -0.84230620f) ? 12 : 13; break;
      case 12: return -0.38105717f;
      case 13: return -0.65492553f;
      case 14: node = (f[0] < 0.34232444f) ? 15 : 22; break;
      case 15: node = (f[2] < -1.31833088f) ? 16 : 19; break;
      case 16: node = (f[15] < 0.24916314f) ? 17 : 18; break;
      case 17: return 0.02904279f;
      case 18: return 0.38031471f;
      case 19: node = (f[6] < -1.13900042f) ? 20 : 21; break;
      case 20: return 0.24687558f;
      case 21: return -0.15474607f;
      case 22: node = (f[0] < 0.85311961f) ? 23 : 26; break;
      case 23: node = (f[2] < 0.23588210f) ? 24 : 25; break;
      case 24: return 0.32864192f;
      case 25: return 0.08387455f;
      case 26: node = (f[15] < 0.15178488f) ? 27 : 28; break;
      case 27: return 0.20431043f;
      case 28: return 0.43922418f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree13(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.41632262f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.09537673f) ? 2 : 9; break;
      case 2: node = (f[1] < -0.13520128f) ? 3 : 6; break;
      case 3: node = (f[20] < 1.62516415f) ? 4 : 5; break;
      case 4: return -0.25196332f;
      case 5: return -0.63289189f;
      case 6: node = (f[0] < -1.80138874f) ? 7 : 8; break;
      case 7: return -0.93563461f;
      case 8: return -0.58769804f;
      case 9: node = (f[2] < -0.85819435f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.00221589f) ? 11 : 12; break;
      case 11: return 0.21708156f;
      case 12: return -0.07397650f;
      case 13: node = (f[8] < 0.02301724f) ? 14 : 15; break;
      case 14: return -0.35087985f;
      case 15: return -0.08629268f;
      case 16: node = (f[0] < 0.64989805f) ? 17 : 24; break;
      case 17: node = (f[7] < 0.00780823f) ? 18 : 21; break;
      case 18: node = (f[15] < -0.76278341f) ? 19 : 20; break;
      case 19: return -0.02028229f;
      case 20: return 0.26671475f;
      case 21: node = (f[2] < -1.38341486f) ? 22 : 23; break;
      case 22: return 0.35052916f;
      case 23: return -0.10344362f;
      case 24: node = (f[15] < 0.42421880f) ? 25 : 28; break;
      case 25: node = (f[8] < -0.27401847f) ? 26 : 27; break;
      case 26: return 0.26231083f;
      case 27: return 0.14060140f;
      case 28: node = (f[6] < 1.29833698f) ? 29 : 30; break;
      case 29: return 0.41758272f;
      case 30: return 0.02172525f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree14(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[20] < 1.62516415f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.17452423f) ? 2 : 9; break;
      case 2: node = (f[16] < -1.91003609f) ? 3 : 6; break;
      case 3: node = (f[15] < -2.59448695f) ? 4 : 5; break;
      case 4: return -0.75637829f;
      case 5: return -0.38124812f;
      case 6: node = (f[8] < -0.56713790f) ? 7 : 8; break;
      case 7: return -0.42642006f;
      case 8: return -0.08720603f;
      case 9: node = (f[14] < 0.52205110f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.31898513f) ? 11 : 12; break;
      case 11: return 0.16114160f;
      case 12: return -0.05260187f;
      case 13: node = (f[10] < 0.58654368f) ? 14 : 15; break;
      case 14: return 0.33582333f;
      case 15: return 0.17191669f;
      case 16: node = (f[8] < -0.00121191f) ? 17 : 22; break;
      case 17: node = (f[15] < -0.39844522f) ? 18 : 19; break;
      case 18: return -0.91143286f;
      case 19: node = (f[20] < 1.80587292f) ? 20 : 21; break;
      case 20: return -0.23289678f;
      case 21: return -0.61188233f;
      case 22: node = (f[15] < -2.93481588f) ? 23 : 24; break;
      case 23: return -0.60386527f;
      case 24: node = (f[8] < 0.06041693f) ? 25 : 26; break;
      case 25: return -0.26515788f;
      case 26: return 0.04821179f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree15(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[14] < 0.24414200f) ? 1 : 16; break;
      case 1: node = (f[20] < 1.62516415f) ? 2 : 9; break;
      case 2: node = (f[10] < 0.20311484f) ? 3 : 6; break;
      case 3: node = (f[14] < -0.82531840f) ? 4 : 5; break;
      case 4: return -0.15418150f;
      case 5: return 0.06893028f;
      case 6: node = (f[8] < 0.04685433f) ? 7 : 8; break;
      case 7: return -0.37058487f;
      case 8: return -0.04185980f;
      case 9: node = (f[7] < -1.32043695f) ? 10 : 13; break;
      case 10: node = (f[15] < 0.53070778f) ? 11 : 12; break;
      case 11: return -0.19831672f;
      case 12: return -0.39246893f;
      case 13: node = (f[8] < 0.00349423f) ? 14 : 15; break;
      case 14: return -0.76616031f;
      case 15: return -0.49265003f;
      case 16: node = (f[14] < 0.75713205f) ? 17 : 24; break;
      case 17: node = (f[1] < 0.53166598f) ? 18 : 21; break;
      case 18: node = (f[6] < -1.22123706f) ? 19 : 20; break;
      case 19: return 0.37248224f;
      case 20: return 0.13235185f;
      case 21: node = (f[7] < 0.10202163f) ? 22 : 23; break;
      case 22: return 0.14490175f;
      case 23: return -0.11036608f;
      case 24: node = (f[15] < 0.07892539f) ? 25 : 28; break;
      case 25: node = (f[16] < -0.15557148f) ? 26 : 27; break;
      case 26: return 0.06641485f;
      case 27: return 0.15177903f;
      case 28: node = (f[6] < 1.29833698f) ? 29 : 30; break;
      case 29: return 0.31048644f;
      case 30: return -0.01021763f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree16(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.25105625f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.06001019f) ? 2 : 9; break;
      case 2: node = (f[5] < 0.67059916f) ? 3 : 6; break;
      case 3: node = (f[7] < -1.31314301f) ? 4 : 5; break;
      case 4: return -0.35156208f;
      case 5: return -0.66286147f;
      case 6: node = (f[20] < 1.12664342f) ? 7 : 8; break;
      case 7: return -0.08919891f;
      case 8: return -0.44312525f;
      case 9: node = (f[6] < -1.13479328f) ? 10 : 13; break;
      case 10: node = (f[20] < 0.06784893f) ? 11 : 12; break;
      case 11: return 0.37256041f;
      case 12: return -0.01819629f;
      case 13: node = (f[11] < 0.93956351f) ? 14 : 15; break;
      case 14: return -0.15754805f;
      case 15: return 0.08009959f;
      case 16: node = (f[0] < 0.73845339f) ? 17 : 24; break;
      case 17: node = (f[6] < -1.22123706f) ? 18 : 21; break;
      case 18: node = (f[5] < -0.85469884f) ? 19 : 20; break;
      case 19: return 0.11319403f;
      case 20: return 0.36998278f;
      case 21: node = (f[3] < 1.06750596f) ? 22 : 23; break;
      case 22: return 0.00351510f;
      case 23: return 0.32406032f;
      case 24: node = (f[15] < 0.26090705f) ? 25 : 28; break;
      case 25: node = (f[6] < 0.64310080f) ? 26 : 27; break;
      case 26: return 0.23469415f;
      case 27: return 0.13144463f;
      case 28: node = (f[6] < 1.29833698f) ? 29 : 30; break;
      case 29: return 0.34725583f;
      case 30: return 0.00998718f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree17(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.41632262f) ? 1 : 14; break;
      case 1: node = (f[0] < -1.62001443f) ? 2 : 7; break;
      case 2: node = (f[6] < -0.71007681f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.51717591f) ? 4 : 5; break;
      case 4: return -0.42338467f;
      case 5: return 0.02521760f;
      case 6: return -0.72492278f;
      case 7: node = (f[1] < -0.82860506f) ? 8 : 11; break;
      case 8: node = (f[19] < 0.92826486f) ? 9 : 10; break;
      case 9: return -0.05548699f;
      case 10: return 0.22800639f;
      case 11: node = (f[8] < -0.01072397f) ? 12 : 13; break;
      case 12: return -0.37449735f;
      case 13: return -0.11524620f;
      case 14: node = (f[0] < 0.34232444f) ? 15 : 22; break;
      case 15: node = (f[7] < 0.01874197f) ? 16 : 19; break;
      case 16: node = (f[19] < 0.31163144f) ? 17 : 18; break;
      case 17: return 0.09073475f;
      case 18: return 0.33586940f;
      case 19: node = (f[1] < -1.69070542f) ? 20 : 21; break;
      case 20: return 0.30059063f;
      case 21: return -0.13074979f;
      case 22: node = (f[0] < 1.12030530f) ? 23 : 26; break;
      case 23: node = (f[1] < 0.28216645f) ? 24 : 25; break;
      case 24: return 0.27148601f;
      case 25: return 0.10919196f;
      case 26: node = (f[15] < 0.68804455f) ? 27 : 28; break;
      case 27: return 0.21490200f;
      case 28: return 0.36308208f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree18(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.78134382f) ? 1 : 16; break;
      case 1: node = (f[6] < -0.99322116f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.51717591f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.44532883f) ? 4 : 5; break;
      case 4: return -0.36342865f;
      case 5: return -0.10311980f;
      case 6: node = (f[12] < -0.58243561f) ? 7 : 8; break;
      case 7: return 0.15580828f;
      case 8: return -0.06971508f;
      case 9: node = (f[0] < -1.86658084f) ? 10 : 13; break;
      case 10: node = (f[8] < 0.01825289f) ? 11 : 12; break;
      case 11: return -0.71900302f;
      case 12: return -0.48154911f;
      case 13: node = (f[10] < -1.06644118f) ? 14 : 15; break;
      case 14: return -0.05249466f;
      case 15: return -0.43663460f;
      case 16: node = (f[0] < 0.34232444f) ? 17 : 24; break;
      case 17: node = (f[1] < -1.69070542f) ? 18 : 21; break;
      case 18: node = (f[6] < 1.07001638f) ? 19 : 20; break;
      case 19: return 0.33300775f;
      case 20: return -0.08231824f;
      case 21: node = (f[6] < -0.85164899f) ? 22 : 23; break;
      case 22: return 0.11355681f;
      case 23: return -0.11256167f;
      case 24: node = (f[0] < 0.73845339f) ? 25 : 28; break;
      case 25: node = (f[6] < -1.22123706f) ? 26 : 27; break;
      case 26: return 0.29346874f;
      case 27: return 0.04178913f;
      case 28: node = (f[6] < 0.64310080f) ? 29 : 30; break;
      case 29: return 0.30756628f;
      case 30: return 0.17118123f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree19(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.32362524f) ? 1 : 16; break;
      case 1: node = (f[1] < -0.54010224f) ? 2 : 9; break;
      case 2: node = (f[20] < 0.18248786f) ? 3 : 6; break;
      case 3: node = (f[6] < 0.13935628f) ? 4 : 5; break;
      case 4: return 0.20429531f;
      case 5: return -0.06925829f;
      case 6: node = (f[0] < -2.77144003f) ? 7 : 8; break;
      case 7: return -0.49604192f;
      case 8: return -0.15216979f;
      case 9: node = (f[0] < -1.67084479f) ? 10 : 13; break;
      case 10: node = (f[6] < -2.12579846f) ? 11 : 12; break;
      case 11: return -0.31711152f;
      case 12: return -0.63358808f;
      case 13: node = (f[6] < -0.84230620f) ? 14 : 15; break;
      case 14: return -0.18014829f;
      case 15: return -0.34671035f;
      case 16: node = (f[0] < 0.73259664f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.39946115f) ? 18 : 21; break;
      case 18: node = (f[0] < 0.05807947f) ? 19 : 20; break;
      case 19: return -0.00259059f;
      case 20: return 0.16957493f;
      case 21: node = (f[6] < -0.85164899f) ? 22 : 23; break;
      case 22: return 0.13853079f;
      case 23: return -0.10483450f;
      case 24: node = (f[17] < -0.54240209f) ? 25 : 28; break;
      case 25: node = (f[6] < 1.29833698f) ? 26 : 27; break;
      case 26: return 0.29976463f;
      case 27: return 0.00000000f;
      case 28: node = (f[6] < 0.64310080f) ? 29 : 30; break;
      case 29: return 0.21940269f;
      case 30: return 0.10129411f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree20(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[20] < 1.63040924f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.10867786f) ? 2 : 9; break;
      case 2: node = (f[17] < 1.13275790f) ? 3 : 6; break;
      case 3: node = (f[7] < -1.40729558f) ? 4 : 5; break;
      case 4: return -0.31957442f;
      case 5: return 0.00990748f;
      case 6: node = (f[15] < -2.31212282f) ? 7 : 8; break;
      case 7: return -0.47203737f;
      case 8: return -0.18953697f;
      case 9: node = (f[14] < 0.67945754f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.27023259f) ? 11 : 12; break;
      case 11: return 0.15612459f;
      case 12: return -0.02247307f;
      case 13: node = (f[10] < 0.58654368f) ? 14 : 15; break;
      case 14: return 0.24014176f;
      case 15: return 0.12710170f;
      case 16: node = (f[7] < -1.32043695f) ? 17 : 22; break;
      case 17: node = (f[15] < -0.31909943f) ? 18 : 19; break;
      case 18: return -0.01041238f;
      case 19: node = (f[15] < 0.53070778f) ? 20 : 21; break;
      case 20: return -0.15380867f;
      case 21: return -0.26602718f;
      case 22: node = (f[8] < -0.00121191f) ? 23 : 26; break;
      case 23: node = (f[15] < -0.18360613f) ? 24 : 25; break;
      case 24: return -0.59170616f;
      case 25: return -0.38408813f;
      case 26: node = (f[18] < 2.02508998f) ? 27 : 28; break;
      case 27: return -0.04930215f;
      case 28: return -0.36741477f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree21(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.28366935f) ? 1 : 16; break;
      case 1: node = (f[2] < -0.85819435f) ? 2 : 9; break;
      case 2: node = (f[0] < -2.03313422f) ? 3 : 6; break;
      case 3: node = (f[6] < -1.22123706f) ? 4 : 5; break;
      case 4: return -0.09395369f;
      case 5: return -0.38514885f;
      case 6: node = (f[1] < -3.05226803f) ? 7 : 8; break;
      case 7: return 0.30601919f;
      case 8: return -0.02805828f;
      case 9: node = (f[0] < -1.75189614f) ? 10 : 13; break;
      case 10: node = (f[18] < 0.09608816f) ? 11 : 12; break;
      case 11: return -0.21372475f;
      case 12: return -0.54614133f;
      case 13: node = (f[8] < 0.05653395f) ? 14 : 15; break;
      case 14: return -0.27116537f;
      case 15: return -0.02982474f;
      case 16: node = (f[0] < 0.72312868f) ? 17 : 24; break;
      case 17: node = (f[2] < -0.11874713f) ? 18 : 21; break;
      case 18: node = (f[2] < -1.38341486f) ? 19 : 20; break;
      case 19: return 0.33591393f;
      case 20: return 0.11633480f;
      case 21: node = (f[6] < -0.85624999f) ? 22 : 23; break;
      case 22: return 0.17316198f;
      case 23: return -0.06723761f;
      case 24: node = (f[15] < 0.26090705f) ? 25 : 28; break;
      case 25: node = (f[8] < -0.19654173f) ? 26 : 27; break;
      case 26: return 0.12487590f;
      case 27: return 0.05064677f;
      case 28: node = (f[6] < 1.29833698f) ? 29 : 30; break;
      case 29: return 0.24135277f;
      case 30: return -0.02097758f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree22(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.28366935f) ? 1 : 16; break;
      case 1: node = (f[10] < 0.34499842f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.92826486f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.75189614f) ? 4 : 5; break;
      case 4: return -0.32728797f;
      case 5: return -0.10963336f;
      case 6: node = (f[17] < 0.36147341f) ? 7 : 8; break;
      case 7: return 0.25011784f;
      case 8: return 0.03670228f;
      case 9: node = (f[0] < -1.03276408f) ? 10 : 13; break;
      case 10: node = (f[17] < 0.15862206f) ? 11 : 12; break;
      case 11: return -0.24383304f;
      case 12: return -0.47586951f;
      case 13: node = (f[19] < 0.93340349f) ? 14 : 15; break;
      case 14: return -0.21589062f;
      case 15: return -0.02471852f;
      case 16: node = (f[0] < 0.68694162f) ? 17 : 24; break;
      case 17: node = (f[7] < 0.01874197f) ? 18 : 21; break;
      case 18: node = (f[19] < 0.27052254f) ? 19 : 20; break;
      case 19: return 0.11690696f;
      case 20: return 0.32044414f;
      case 21: node = (f[3] < 0.70645189f) ? 22 : 23; break;
      case 22: return -0.11263889f;
      case 23: return 0.08292858f;
      case 24: node = (f[17] < -0.51832426f) ? 25 : 28; break;
      case 25: node = (f[0] < 1.12927616f) ? 26 : 27; break;
      case 26: return 0.18472385f;
      case 27: return 0.25670344f;
      case 28: node = (f[7] < 0.50948823f) ? 29 : 30; break;
      case 29: return 0.16282225f;
      case 30: return 0.08347021f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree23(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.09276102f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.03276408f) ? 2 : 9; break;
      case 2: node = (f[8] < 0.05653395f) ? 3 : 6; break;
      case 3: node = (f[10] < -0.34908235f) ? 4 : 5; break;
      case 4: return -0.19880748f;
      case 5: return -0.38454688f;
      case 6: node = (f[17] < 1.26390755f) ? 7 : 8; break;
      case 7: return 0.11571494f;
      case 8: return -0.24058636f;
      case 9: node = (f[2] < -2.14421368f) ? 10 : 13; break;
      case 10: node = (f[6] < 0.84721720f) ? 11 : 12; break;
      case 11: return 0.30890012f;
      case 12: return 0.04251903f;
      case 13: node = (f[6] < -0.85164899f) ? 14 : 15; break;
      case 14: return 0.04929805f;
      case 15: return -0.12537707f;
      case 16: node = (f[17] < 0.84774357f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.35457411f) ? 18 : 21; break;
      case 18: node = (f[6] < 1.41350591f) ? 19 : 20; break;
      case 19: return 0.20023476f;
      case 20: return -0.00007372f;
      case 21: node = (f[0] < 0.84094810f) ? 22 : 23; break;
      case 22: return -0.00560880f;
      case 23: return 0.15617824f;
      case 24: node = (f[0] < 0.54677588f) ? 25 : 28; break;
      case 25: node = (f[11] < -0.21631528f) ? 26 : 27; break;
      case 26: return -0.12180591f;
      case 27: return -0.05168732f;
      case 28: return 0.00000000f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree24(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[17] < 1.04051661f) ? 1 : 16; break;
      case 1: node = (f[8] < 0.02940296f) ? 2 : 9; break;
      case 2: node = (f[14] < -0.82531840f) ? 3 : 6; break;
      case 3: node = (f[19] < -0.09688821f) ? 4 : 5; break;
      case 4: return -0.27347195f;
      case 5: return -0.09671900f;
      case 6: node = (f[14] < 0.34807548f) ? 7 : 8; break;
      case 7: return -0.02712251f;
      case 8: return 0.07437691f;
      case 9: node = (f[6] < -1.30405152f) ? 10 : 13; break;
      case 10: node = (f[17] < 0.28859079f) ? 11 : 12; break;
      case 11: return 0.29959992f;
      case 12: return 0.05134572f;
      case 13: node = (f[2] < -2.81412983f) ? 14 : 15; break;
      case 14: return 0.34457484f;
      case 15: return 0.10488278f;
      case 16: node = (f[17] < 3.51191568f) ? 17 : 24; break;
      case 17: node = (f[16] < -1.91003609f) ? 18 : 21; break;
      case 18: node = (f[17] < 1.80793154f) ? 19 : 20; break;
      case 19: return -0.11685514f;
      case 20: return -0.24385707f;
      case 21: node = (f[8] < -0.66659045f) ? 22 : 23; break;
      case 22: return -0.27675199f;
      case 23: return -0.08308370f;
      case 24: return -0.53510135f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree25(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.00892831f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.21560395f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.84230620f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.51717591f) ? 4 : 5; break;
      case 4: return -0.19339034f;
      case 5: return 0.04958215f;
      case 6: node = (f[7] < 0.11655609f) ? 7 : 8; break;
      case 7: return -0.36044884f;
      case 8: return 0.05072864f;
      case 9: node = (f[6] < 0.13935628f) ? 10 : 13; break;
      case 10: node = (f[2] < -0.54355955f) ? 11 : 12; break;
      case 11: return 0.15822727f;
      case 12: return -0.04121706f;
      case 13: node = (f[1] < -2.12579107f) ? 14 : 15; break;
      case 14: return 0.10918459f;
      case 15: return -0.17460677f;
      case 16: node = (f[2] < 0.19728565f) ? 17 : 24; break;
      case 17: node = (f[17] < 0.24908018f) ? 18 : 21; break;
      case 18: node = (f[1] < -1.19869196f) ? 19 : 20; break;
      case 19: return 0.37216648f;
      case 20: return 0.17311737f;
      case 21: node = (f[6] < 1.13505936f) ? 22 : 23; break;
      case 22: return 0.03191109f;
      case 23: return -0.06684010f;
      case 24: node = (f[0] < 0.84094810f) ? 25 : 28; break;
      case 25: node = (f[6] < -0.85164899f) ? 26 : 27; break;
      case 26: return 0.14909588f;
      case 27: return -0.04854117f;
      case 28: node = (f[17] < -0.68357873f) ? 29 : 30; break;
      case 29: return 0.19585615f;
      case 30: return 0.08974256f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree26(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[20] < 1.63040924f) ? 1 : 14; break;
      case 1: node = (f[17] < 1.13275790f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.11410942f) ? 3 : 6; break;
      case 3: node = (f[7] < -1.01178002f) ? 4 : 5; break;
      case 4: return -0.20077108f;
      case 5: return 0.02830332f;
      case 6: node = (f[6] < -1.30405152f) ? 7 : 8; break;
      case 7: return 0.23252815f;
      case 8: return 0.08095063f;
      case 9: node = (f[15] < -2.59448695f) ? 10 : 11; break;
      case 10: return -0.40518230f;
      case 11: node = (f[18] < 1.13879180f) ? 12 : 13; break;
      case 12: return -0.22741193f;
      case 13: return -0.08861633f;
      case 14: node = (f[7] < -1.32043695f) ? 15 : 20; break;
      case 15: node = (f[15] < -0.20165631f) ? 16 : 17; break;
      case 16: return 0.03145846f;
      case 17: node = (f[7] < -1.35425079f) ? 18 : 19; break;
      case 18: return -0.08454495f;
      case 19: return -0.17472133f;
      case 20: node = (f[8] < -0.02088458f) ? 21 : 24; break;
      case 21: node = (f[20] < 1.74006259f) ? 22 : 23; break;
      case 22: return -0.14584272f;
      case 23: return -0.39297035f;
      case 24: node = (f[15] < -0.56167889f) ? 25 : 26; break;
      case 25: return -0.23689069f;
      case 26: return -0.02726817f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree27(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[20] < 1.63040924f) ? 1 : 16; break;
      case 1: node = (f[17] < 0.21767840f) ? 2 : 9; break;
      case 2: node = (f[2] < -1.38341486f) ? 3 : 6; break;
      case 3: node = (f[8] < -0.48202825f) ? 4 : 5; break;
      case 4: return 0.32086807f;
      case 5: return 0.15037103f;
      case 6: node = (f[14] < 0.34807548f) ? 7 : 8; break;
      case 7: return -0.01571204f;
      case 8: return 0.08726110f;
      case 9: node = (f[14] < 0.63954109f) ? 10 : 13; break;
      case 10: node = (f[15] < -2.31212282f) ? 11 : 12; break;
      case 11: return -0.33198118f;
      case 12: return -0.08335550f;
      case 13: node = (f[17] < 0.96039134f) ? 14 : 15; break;
      case 14: return 0.05410998f;
      case 15: return -0.07101028f;
      case 16: node = (f[7] < -1.32043695f) ? 17 : 24; break;
      case 17: node = (f[10] < -0.10295662f) ? 18 : 21; break;
      case 18: node = (f[8] < -0.03428793f) ? 19 : 20; break;
      case 19: return -0.06345098f;
      case 20: return 0.01442240f;
      case 21: node = (f[7] < -1.35425079f) ? 22 : 23; break;
      case 22: return -0.08816925f;
      case 23: return -0.19352670f;
      case 24: node = (f[20] < 2.12824631f) ? 25 : 28; break;
      case 25: node = (f[17] < 3.51191568f) ? 26 : 27; break;
      case 26: return -0.19385849f;
      case 27: return -0.39607963f;
      case 28: return -0.43889168f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree28(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.22979137f) ? 1 : 16; break;
      case 1: node = (f[2] < -1.38341486f) ? 2 : 9; break;
      case 2: node = (f[0] < -2.14613175f) ? 3 : 6; break;
      case 3: node = (f[19] < -0.07119515f) ? 4 : 5; break;
      case 4: return -0.23505798f;
      case 5: return 0.01884852f;
      case 6: node = (f[6] < 0.02756617f) ? 7 : 8; break;
      case 7: return 0.21391088f;
      case 8: return -0.00547176f;
      case 9: node = (f[6] < -0.84230620f) ? 10 : 13; break;
      case 10: node = (f[20] < 0.09657811f) ? 11 : 12; break;
      case 11: return 0.16869989f;
      case 12: return -0.11004649f;
      case 13: node = (f[0] < -1.52173412f) ? 14 : 15; break;
      case 14: return -0.35184154f;
      case 15: return -0.20396547f;
      case 16: node = (f[0] < 0.68694162f) ? 17 : 24; break;
      case 17: node = (f[7] < 0.01874197f) ? 18 : 21; break;
      case 18: node = (f[19] < 0.31163144f) ? 19 : 20; break;
      case 19: return 0.08532839f;
      case 20: return 0.27888465f;
      case 21: node = (f[3] < 0.70645189f) ? 22 : 23; break;
      case 22: return -0.09361928f;
      case 23: return 0.08284828f;
      case 24: node = (f[6] < 0.70564503f) ? 25 : 28; break;
      case 25: node = (f[1] < 0.11983693f) ? 26 : 27; break;
      case 26: return 0.26402760f;
      case 27: return 0.14458905f;
      case 28: node = (f[0] < 1.15141892f) ? 29 : 30; break;
      case 29: return 0.04621990f;
      case 30: return 0.15607855f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree29(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.09276102f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.41482818f) ? 2 : 9; break;
      case 2: node = (f[4] < 1.09052849f) ? 3 : 6; break;
      case 3: node = (f[7] < -1.30770004f) ? 4 : 5; break;
      case 4: return -0.15303315f;
      case 5: return -0.31230387f;
      case 6: node = (f[3] < 1.16219401f) ? 7 : 8; break;
      case 7: return -0.15222700f;
      case 8: return 0.11760909f;
      case 9: node = (f[2] < -1.38341486f) ? 10 : 13; break;
      case 10: node = (f[6] < 0.94131786f) ? 11 : 12; break;
      case 11: return 0.19152768f;
      case 12: return -0.01219763f;
      case 13: node = (f[8] < -0.52133203f) ? 14 : 15; break;
      case 14: return -0.20450377f;
      case 15: return -0.04482157f;
      case 16: node = (f[2] < -0.40616161f) ? 17 : 22; break;
      case 17: node = (f[20] < 1.29448617f) ? 18 : 21; break;
      case 18: node = (f[6] < 0.94131786f) ? 19 : 20; break;
      case 19: return 0.30477253f;
      case 20: return 0.13500105f;
      case 21: return -0.04226784f;
      case 22: node = (f[0] < 0.78266633f) ? 23 : 26; break;
      case 23: node = (f[6] < -0.85164899f) ? 24 : 25; break;
      case 24: return 0.15278870f;
      case 25: return -0.02897980f;
      case 26: node = (f[6] < 0.64310080f) ? 27 : 28; break;
      case 27: return 0.15915740f;
      case 28: return 0.06710528f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree30(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.42804927f) ? 1 : 16; break;
      case 1: node = (f[8] < 0.05653395f) ? 2 : 9; break;
      case 2: node = (f[10] < -0.34908235f) ? 3 : 6; break;
      case 3: node = (f[20] < 0.32611182f) ? 4 : 5; break;
      case 4: return 0.06789272f;
      case 5: return -0.14059141f;
      case 6: node = (f[18] < -0.16458775f) ? 7 : 8; break;
      case 7: return -0.12014871f;
      case 8: return -0.26502046f;
      case 9: node = (f[18] < 1.13879180f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.36122149f) ? 11 : 12; break;
      case 11: return -0.03688782f;
      case 12: return 0.15428118f;
      case 13: node = (f[7] < -1.34563541f) ? 14 : 15; break;
      case 14: return -0.05198804f;
      case 15: return -0.16275719f;
      case 16: node = (f[6] < -1.11427951f) ? 17 : 24; break;
      case 17: node = (f[20] < 0.00032074f) ? 18 : 21; break;
      case 18: node = (f[1] < -0.05861288f) ? 19 : 20; break;
      case 19: return 0.30472583f;
      case 20: return 0.20955396f;
      case 21: node = (f[20] < 1.19179583f) ? 22 : 23; break;
      case 22: return 0.05920252f;
      case 23: return 0.18002309f;
      case 24: node = (f[0] < 0.84094810f) ? 25 : 28; break;
      case 25: node = (f[3] < 0.84766924f) ? 26 : 27; break;
      case 26: return -0.04599443f;
      case 27: return 0.11615074f;
      case 28: node = (f[0] < 1.12927616f) ? 29 : 30; break;
      case 29: return 0.07302837f;
      case 30: return 0.16462648f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree31(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.63909358f) ? 1 : 16; break;
      case 1: node = (f[3] < 0.96810794f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.77742034f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.51717591f) ? 4 : 5; break;
      case 4: return -0.11779395f;
      case 5: return 0.03041664f;
      case 6: node = (f[6] < -0.37640220f) ? 7 : 8; break;
      case 7: return -0.19274563f;
      case 8: return -0.30615726f;
      case 9: node = (f[0] < -2.34593511f) ? 10 : 13; break;
      case 10: node = (f[9] < -0.86610794f) ? 11 : 12; break;
      case 11: return -0.09055667f;
      case 12: return -0.28068909f;
      case 13: node = (f[4] < 0.62901437f) ? 14 : 15; break;
      case 14: return -0.02812902f;
      case 15: return 0.20621766f;
      case 16: node = (f[6] < -1.30405152f) ? 17 : 22; break;
      case 17: node = (f[17] < -0.57487160f) ? 18 : 21; break;
      case 18: node = (f[19] < 0.03157709f) ? 19 : 20; break;
      case 19: return 0.21004216f;
      case 20: return 0.32573074f;
      case 21: return 0.13693589f;
      case 22: node = (f[0] < 0.68694162f) ? 23 : 26; break;
      case 23: node = (f[10] < 0.33036345f) ? 24 : 25; break;
      case 24: return 0.04025751f;
      case 25: return -0.07462123f;
      case 26: node = (f[2] < -0.30832160f) ? 27 : 28; break;
      case 27: return 0.23525785f;
      case 28: return 0.07685316f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree32(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.09276102f) ? 1 : 16; break;
      case 1: node = (f[0] < -0.99623370f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.01669395f) ? 3 : 6; break;
      case 3: node = (f[17] < 0.23621768f) ? 4 : 5; break;
      case 4: return -0.12909505f;
      case 5: return -0.25372821f;
      case 6: node = (f[17] < 1.66321087f) ? 7 : 8; break;
      case 7: return 0.02429553f;
      case 8: return -0.13948521f;
      case 9: node = (f[6] < 0.13935628f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.30005634f) ? 11 : 12; break;
      case 11: return -0.03052898f;
      case 12: return 0.13666832f;
      case 13: node = (f[20] < -1.35915792f) ? 14 : 15; break;
      case 14: return 0.08472669f;
      case 15: return -0.11675474f;
      case 16: node = (f[17] < 0.28859079f) ? 17 : 24; break;
      case 17: node = (f[3] < 1.06750596f) ? 18 : 21; break;
      case 18: node = (f[6] < -1.22123706f) ? 19 : 20; break;
      case 19: return 0.16506584f;
      case 20: return 0.04983393f;
      case 21: node = (f[8] < -0.17646164f) ? 22 : 23; break;
      case 22: return 0.22922368f;
      case 23: return 0.04238505f;
      case 24: node = (f[17] < 0.99750614f) ? 25 : 28; break;
      case 25: node = (f[6] < 1.29833698f) ? 26 : 27; break;
      case 26: return 0.03145527f;
      case 27: return -0.07630587f;
      case 28: node = (f[0] < 0.57526672f) ? 29 : 30; break;
      case 29: return -0.06565566f;
      case 30: return -0.01975309f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree33(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.22979137f) ? 1 : 16; break;
      case 1: node = (f[8] < 0.01825289f) ? 2 : 9; break;
      case 2: node = (f[0] < -1.49171865f) ? 3 : 6; break;
      case 3: node = (f[10] < -2.81805062f) ? 4 : 5; break;
      case 4: return -0.04668778f;
      case 5: return -0.23949125f;
      case 6: node = (f[11] < 0.20479894f) ? 7 : 8; break;
      case 7: return -0.13576451f;
      case 8: return -0.01167513f;
      case 9: node = (f[17] < 1.66321087f) ? 10 : 13; break;
      case 10: node = (f[15] < 0.37743771f) ? 11 : 12; break;
      case 11: return 0.08409888f;
      case 12: return -0.03768358f;
      case 13: node = (f[5] < -0.31710869f) ? 14 : 15; break;
      case 14: return -0.05929746f;
      case 15: return -0.18050606f;
      case 16: node = (f[0] < 0.68694162f) ? 17 : 24; break;
      case 17: node = (f[7] < 0.00780823f) ? 18 : 21; break;
      case 18: node = (f[20] < 0.20491563f) ? 19 : 20; break;
      case 19: return 0.18243799f;
      case 20: return 0.05370506f;
      case 21: node = (f[11] < 1.26167738f) ? 22 : 23; break;
      case 22: return -0.05717576f;
      case 23: return 0.13869238f;
      case 24: node = (f[6] < 0.70564503f) ? 25 : 28; break;
      case 25: node = (f[20] < 1.10423398f) ? 26 : 27; break;
      case 26: return 0.13196392f;
      case 27: return -0.01551223f;
      case 28: node = (f[0] < 1.15141892f) ? 29 : 30; break;
      case 29: return 0.02761777f;
      case 30: return 0.12906896f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree34(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[17] < 0.42247450f) ? 1 : 14; break;
      case 1: node = (f[19] < 1.03103709f) ? 2 : 9; break;
      case 2: node = (f[7] < -1.01178002f) ? 3 : 6; break;
      case 3: node = (f[8] < 0.01825289f) ? 4 : 5; break;
      case 4: return -0.11973620f;
      case 5: return 0.05115126f;
      case 6: node = (f[7] < 0.00485528f) ? 7 : 8; break;
      case 7: return 0.13736714f;
      case 8: return 0.00720822f;
      case 9: node = (f[7] < 1.21490014f) ? 10 : 13; break;
      case 10: node = (f[12] < -0.79414785f) ? 11 : 12; break;
      case 11: return 0.11616092f;
      case 12: return 0.20156318f;
      case 13: return -0.06468337f;
      case 14: node = (f[18] < 2.96352315f) ? 15 : 22; break;
      case 15: node = (f[14] < -0.17008562f) ? 16 : 19; break;
      case 16: node = (f[8] < -0.58242869f) ? 17 : 18; break;
      case 17: return -0.25656220f;
      case 18: return -0.06821525f;
      case 19: node = (f[17] < 0.99750614f) ? 20 : 21; break;
      case 20: return 0.01473464f;
      case 21: return -0.06626323f;
      case 22: return -0.32075965f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree35(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.09276102f) ? 1 : 14; break;
      case 1: node = (f[2] < -2.37132335f) ? 2 : 7; break;
      case 2: node = (f[0] < -2.34593511f) ? 3 : 4; break;
      case 3: return -0.16897170f;
      case 4: node = (f[6] < 0.98878938f) ? 5 : 6; break;
      case 5: return 0.25153855f;
      case 6: return 0.04913382f;
      case 7: node = (f[6] < -0.84230620f) ? 8 : 11; break;
      case 8: node = (f[20] < 0.11814327f) ? 9 : 10; break;
      case 9: return 0.15770891f;
      case 10: return -0.05902616f;
      case 11: node = (f[0] < -1.41482818f) ? 12 : 13; break;
      case 12: return -0.21772985f;
      case 13: return -0.09663151f;
      case 14: node = (f[1] < 0.33561444f) ? 15 : 20; break;
      case 15: node = (f[1] < -1.12461972f) ? 16 : 17; break;
      case 16: return 0.25629553f;
      case 17: node = (f[6] < 1.27193367f) ? 18 : 19; break;
      case 18: return 0.10319979f;
      case 19: return -0.00798236f;
      case 20: node = (f[0] < 0.90127641f) ? 21 : 24; break;
      case 21: node = (f[15] < 0.84411508f) ? 22 : 23; break;
      case 22: return 0.00401268f;
      case 23: return -0.12503468f;
      case 24: node = (f[17] < -0.82483333f) ? 25 : 26; break;
      case 25: return 0.13071063f;
      case 26: return 0.04446600f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree36(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[17] < 1.26390755f) ? 1 : 16; break;
      case 1: node = (f[8] < 0.03427539f) ? 2 : 9; break;
      case 2: node = (f[7] < -1.01178002f) ? 3 : 6; break;
      case 3: node = (f[18] < -0.16458775f) ? 4 : 5; break;
      case 4: return -0.02867609f;
      case 5: return -0.17834997f;
      case 6: node = (f[10] < -0.33055142f) ? 7 : 8; break;
      case 7: return 0.09472547f;
      case 8: return -0.01002229f;
      case 9: node = (f[2] < -1.38341486f) ? 10 : 13; break;
      case 10: node = (f[3] < 1.49219322f) ? 11 : 12; break;
      case 11: return 0.12084705f;
      case 12: return 0.23818502f;
      case 13: node = (f[17] < -0.85036129f) ? 14 : 15; break;
      case 14: return 0.08754302f;
      case 15: return 0.02191475f;
      case 16: node = (f[18] < 2.96352315f) ? 17 : 24; break;
      case 17: node = (f[15] < -1.21251988f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.76490778f) ? 19 : 20; break;
      case 19: return -0.11025312f;
      case 20: return -0.04366337f;
      case 21: node = (f[8] < 2.27562928f) ? 22 : 23; break;
      case 22: return -0.19333807f;
      case 23: return -0.04368065f;
      case 24: return -0.29304725f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree37(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[20] < 0.47524613f) ? 1 : 14; break;
      case 1: node = (f[17] < 0.20224741f) ? 2 : 9; break;
      case 2: node = (f[7] < 0.00780823f) ? 3 : 6; break;
      case 3: node = (f[6] < -2.12579846f) ? 4 : 5; break;
      case 4: return -0.04229460f;
      case 5: return 0.13759527f;
      case 6: node = (f[7] < 0.80088729f) ? 7 : 8; break;
      case 7: return -0.01800860f;
      case 8: return 0.06429977f;
      case 9: node = (f[14] < -1.88724744f) ? 10 : 11; break;
      case 10: return 0.16979064f;
      case 11: node = (f[14] < -0.17008562f) ? 12 : 13; break;
      case 12: return -0.08809406f;
      case 13: return -0.01927106f;
      case 14: node = (f[7] < -1.30770004f) ? 15 : 22; break;
      case 15: node = (f[2] < 0.02260159f) ? 16 : 19; break;
      case 16: node = (f[15] < -2.00917983f) ? 17 : 18; break;
      case 17: return -0.07046437f;
      case 18: return 0.07409838f;
      case 19: node = (f[14] < 0.01807615f) ? 20 : 21; break;
      case 20: return -0.06581729f;
      case 21: return 0.04629114f;
      case 22: node = (f[7] < -1.03168774f) ? 23 : 26; break;
      case 23: node = (f[20] < 2.12824631f) ? 24 : 25; break;
      case 24: return -0.13385485f;
      case 25: return -0.28001532f;
      case 26: node = (f[6] < -0.18780287f) ? 27 : 28; break;
      case 27: return 0.01119635f;
      case 28: return -0.17989324f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree38(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[20] < 0.47524613f) ? 1 : 14; break;
      case 1: node = (f[10] < -0.31898513f) ? 2 : 7; break;
      case 2: node = (f[6] < 1.41350591f) ? 3 : 6; break;
      case 3: node = (f[17] < -0.79953027f) ? 4 : 5; break;
      case 4: return 0.20059188f;
      case 5: return 0.07385045f;
      case 6: return -0.12146176f;
      case 7: node = (f[14] < 0.34939346f) ? 8 : 11; break;
      case 8: node = (f[8] < -0.53794485f) ? 9 : 10; break;
      case 9: return -0.15085417f;
      case 10: return 0.00449408f;
      case 11: node = (f[10] < 0.47821850f) ? 12 : 13; break;
      case 12: return 0.06856406f;
      case 13: return -0.00109483f;
      case 14: node = (f[8] < 0.00349423f) ? 15 : 22; break;
      case 15: node = (f[20] < 2.00908613f) ? 16 : 19; break;
      case 16: node = (f[15] < -4.23987818f) ? 17 : 18; break;
      case 17: return -0.21699633f;
      case 18: return -0.05990594f;
      case 19: node = (f[6] < -0.42693242f) ? 20 : 21; break;
      case 20: return -0.13372284f;
      case 21: return -0.27673292f;
      case 22: node = (f[19] < -0.76490778f) ? 23 : 26; break;
      case 23: node = (f[20] < 1.57747960f) ? 24 : 25; break;
      case 24: return -0.17413330f;
      case 25: return -0.04899073f;
      case 26: node = (f[6] < -1.22123706f) ? 27 : 28; break;
      case 27: return 0.06382896f;
      case 28: return -0.00973521f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree39(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.04992451f) ? 1 : 14; break;
      case 1: node = (f[2] < -2.25727010f) ? 2 : 7; break;
      case 2: node = (f[0] < -2.77144003f) ? 3 : 4; break;
      case 3: return -0.15841878f;
      case 4: node = (f[20] < 1.37085974f) ? 5 : 6; break;
      case 5: return 0.09119467f;
      case 6: return 0.31388921f;
      case 7: node = (f[6] < -0.84230620f) ? 8 : 11; break;
      case 8: node = (f[20] < 0.20852819f) ? 9 : 10; break;
      case 9: return 0.10152127f;
      case 10: return -0.04600818f;
      case 11: node = (f[8] < -0.58242869f) ? 12 : 13; break;
      case 12: return -0.16627328f;
      case 13: return -0.07832794f;
      case 14: node = (f[2] < -0.11874713f) ? 15 : 22; break;
      case 15: node = (f[1] < -1.12461972f) ? 16 : 19; break;
      case 16: node = (f[6] < 0.84721720f) ? 17 : 18; break;
      case 17: return 0.27751613f;
      case 18: return 0.15442280f;
      case 19: node = (f[20] < 1.30144918f) ? 20 : 21; break;
      case 20: return 0.09781776f;
      case 21: return -0.08668640f;
      case 22: node = (f[0] < 0.73845339f) ? 23 : 26; break;
      case 23: node = (f[16] < 0.89067471f) ? 24 : 25; break;
      case 24: return -0.00344272f;
      case 25: return -0.15810745f;
      case 26: node = (f[0] < 1.12927616f) ? 27 : 28; break;
      case 27: return 0.04057322f;
      case 28: return 0.10579764f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree40(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.22979137f) ? 1 : 14; break;
      case 1: node = (f[8] < -0.58242869f) ? 2 : 7; break;
      case 2: node = (f[11] < -0.06143492f) ? 3 : 6; break;
      case 3: node = (f[14] < -0.12640344f) ? 4 : 5; break;
      case 4: return -0.21743736f;
      case 5: return -0.11476684f;
      case 6: return -0.04095688f;
      case 7: node = (f[0] < -2.03313422f) ? 8 : 11; break;
      case 8: node = (f[7] < -1.28746521f) ? 9 : 10; break;
      case 9: return -0.07621751f;
      case 10: return -0.21099710f;
      case 11: node = (f[1] < -3.05226803f) ? 12 : 13; break;
      case 12: return 0.17947200f;
      case 13: return -0.03982764f;
      case 14: node = (f[2] < -0.12887126f) ? 15 : 22; break;
      case 15: node = (f[17] < 0.16686360f) ? 16 : 19; break;
      case 16: node = (f[20] < 1.29448617f) ? 17 : 18; break;
      case 17: return 0.12048183f;
      case 18: return -0.03923367f;
      case 19: node = (f[0] < -0.13152099f) ? 20 : 21; break;
      case 20: return -0.06747065f;
      case 21: return -0.01251199f;
      case 22: node = (f[0] < 1.12927616f) ? 23 : 26; break;
      case 23: node = (f[6] < -0.85164899f) ? 24 : 25; break;
      case 24: return 0.08595815f;
      case 25: return -0.01315813f;
      case 26: node = (f[18] < -0.84234512f) ? 27 : 28; break;
      case 27: return 0.13006447f;
      case 28: return 0.05260933f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree41(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.09276102f) ? 1 : 16; break;
      case 1: node = (f[11] < -0.09005384f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.77742034f) ? 3 : 6; break;
      case 3: node = (f[12] < -0.48437125f) ? 4 : 5; break;
      case 4: return 0.02333706f;
      case 5: return -0.06518454f;
      case 6: node = (f[20] < -0.32454559f) ? 7 : 8; break;
      case 7: return -0.05868527f;
      case 8: return -0.13766922f;
      case 9: node = (f[20] < 2.06902266f) ? 10 : 13; break;
      case 10: node = (f[2] < -3.04236531f) ? 11 : 12; break;
      case 11: return 0.10900501f;
      case 12: return -0.01390680f;
      case 13: node = (f[0] < -1.91713965f) ? 14 : 15; break;
      case 14: return -0.22132276f;
      case 15: return -0.07200346f;
      case 16: node = (f[10] < -0.27023259f) ? 17 : 22; break;
      case 17: node = (f[6] < 1.41350591f) ? 18 : 21; break;
      case 18: node = (f[19] < 0.21142851f) ? 19 : 20; break;
      case 19: return 0.08871415f;
      case 20: return 0.17701913f;
      case 21: return -0.08020572f;
      case 22: node = (f[0] < 0.68694162f) ? 23 : 26; break;
      case 23: node = (f[6] < -1.22123706f) ? 24 : 25; break;
      case 24: return 0.08150107f;
      case 25: return -0.03695991f;
      case 26: node = (f[6] < 0.70564503f) ? 27 : 28; break;
      case 27: return 0.07502356f;
      case 28: return 0.01433393f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree42(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[17] < 0.99750614f) ? 1 : 14; break;
      case 1: node = (f[20] < 2.06902266f) ? 2 : 9; break;
      case 2: node = (f[3] < 1.06750596f) ? 3 : 6; break;
      case 3: node = (f[17] < -0.85948110f) ? 4 : 5; break;
      case 4: return 0.04164333f;
      case 5: return -0.00494918f;
      case 6: node = (f[14] < -3.15854955f) ? 7 : 8; break;
      case 7: return -0.14871728f;
      case 8: return 0.08676748f;
      case 9: node = (f[6] < -0.42693242f) ? 10 : 13; break;
      case 10: node = (f[10] < -1.79449582f) ? 11 : 12; break;
      case 11: return -0.14366525f;
      case 12: return -0.04353823f;
      case 13: return -0.22447784f;
      case 14: node = (f[18] < 2.96352315f) ? 15 : 22; break;
      case 15: node = (f[8] < -0.65263838f) ? 16 : 19; break;
      case 16: node = (f[14] < -0.25217801f) ? 17 : 18; break;
      case 17: return -0.19733162f;
      case 18: return -0.06288763f;
      case 19: node = (f[19] < -0.76490778f) ? 20 : 21; break;
      case 20: return -0.08394136f;
      case 21: return -0.01896545f;
      case 22: return -0.19680619f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree43(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.58984327f) ? 1 : 16; break;
      case 1: node = (f[11] < -0.19536339f) ? 2 : 9; break;
      case 2: node = (f[0] < -0.61860609f) ? 3 : 6; break;
      case 3: node = (f[7] < -1.16357005f) ? 4 : 5; break;
      case 4: return -0.07124364f;
      case 5: return -0.16229861f;
      case 6: node = (f[7] < 0.00780823f) ? 7 : 8; break;
      case 7: return 0.02272817f;
      case 8: return -0.06216915f;
      case 9: node = (f[3] < 0.01931431f) ? 10 : 13; break;
      case 10: node = (f[0] < -0.35666555f) ? 11 : 12; break;
      case 11: return -0.07582963f;
      case 12: return -0.01921557f;
      case 13: node = (f[0] < -2.03313422f) ? 14 : 15; break;
      case 14: return -0.10756224f;
      case 15: return 0.03906279f;
      case 16: node = (f[20] < 1.29448617f) ? 17 : 24; break;
      case 17: node = (f[14] < 0.74046201f) ? 18 : 21; break;
      case 18: node = (f[2] < -0.17927940f) ? 19 : 20; break;
      case 19: return 0.17354441f;
      case 20: return 0.07768919f;
      case 21: node = (f[0] < 1.12927616f) ? 22 : 23; break;
      case 22: return 0.00500278f;
      case 23: return 0.08535410f;
      case 24: return -0.12421691f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree44(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.14112975f) ? 1 : 14; break;
      case 1: node = (f[2] < -2.37132335f) ? 2 : 7; break;
      case 2: node = (f[0] < -2.77144003f) ? 3 : 4; break;
      case 3: return -0.14370856f;
      case 4: node = (f[6] < 0.98878938f) ? 5 : 6; break;
      case 5: return 0.18607265f;
      case 6: return -0.02630194f;
      case 7: node = (f[8] < -0.53794485f) ? 8 : 11; break;
      case 8: node = (f[6] < 0.13935628f) ? 9 : 10; break;
      case 9: return -0.01890433f;
      case 10: return -0.13732958f;
      case 11: node = (f[0] < -1.37341797f) ? 12 : 13; break;
      case 12: return -0.08400697f;
      case 13: return -0.00076760f;
      case 14: node = (f[10] < 0.41466606f) ? 15 : 22; break;
      case 15: node = (f[14] < 0.05736300f) ? 16 : 19; break;
      case 16: node = (f[6] < 1.29833698f) ? 17 : 18; break;
      case 17: return 0.14031893f;
      case 18: return -0.02857934f;
      case 19: node = (f[18] < -1.12908864f) ? 20 : 21; break;
      case 20: return 0.15278931f;
      case 21: return 0.03998160f;
      case 22: node = (f[0] < 0.68694162f) ? 23 : 26; break;
      case 23: node = (f[15] < 0.97633404f) ? 24 : 25; break;
      case 24: return -0.03605381f;
      case 25: return -0.22622636f;
      case 26: node = (f[0] < 1.24309039f) ? 27 : 28; break;
      case 27: return 0.00943666f;
      case 28: return 0.09184887f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree45(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.04992451f) ? 1 : 16; break;
      case 1: node = (f[8] < -0.35360712f) ? 2 : 9; break;
      case 2: node = (f[3] < 1.97729218f) ? 3 : 6; break;
      case 3: node = (f[20] < -0.33042857f) ? 4 : 5; break;
      case 4: return -0.07382300f;
      case 5: return -0.15252170f;
      case 6: node = (f[6] < 1.07001638f) ? 7 : 8; break;
      case 7: return 0.13534106f;
      case 8: return -0.06920315f;
      case 9: node = (f[20] < 0.11814327f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.00221589f) ? 11 : 12; break;
      case 11: return 0.14213428f;
      case 12: return -0.01115975f;
      case 13: node = (f[8] < 0.01825289f) ? 14 : 15; break;
      case 14: return -0.06541687f;
      case 15: return 0.01060453f;
      case 16: node = (f[6] < 1.41350591f) ? 17 : 24; break;
      case 17: node = (f[10] < 0.56888330f) ? 18 : 21; break;
      case 18: node = (f[20] < 1.37085974f) ? 19 : 20; break;
      case 19: return 0.06348573f;
      case 20: return -0.11178341f;
      case 21: node = (f[0] < 0.78266633f) ? 22 : 23; break;
      case 22: return -0.04232361f;
      case 23: return 0.03526232f;
      case 24: node = (f[15] < 0.22517361f) ? 25 : 28; break;
      case 25: node = (f[18] < 0.04395298f) ? 26 : 27; break;
      case 26: return 0.07198931f;
      case 27: return -0.04597713f;
      case 28: node = (f[3] < 0.12775329f) ? 29 : 30; break;
      case 29: return -0.07423911f;
      case 30: return -0.14700940f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree46(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[18] < 2.88532043f) ? 1 : 16; break;
      case 1: node = (f[6] < -1.13479328f) ? 2 : 9; break;
      case 2: node = (f[6] < -1.98422635f) ? 3 : 6; break;
      case 3: node = (f[15] < -0.24951902f) ? 4 : 5; break;
      case 4: return -0.13483571f;
      case 5: return 0.00962001f;
      case 6: node = (f[6] < -1.84265423f) ? 7 : 8; break;
      case 7: return 0.18510172f;
      case 8: return 0.06616991f;
      case 9: node = (f[7] < -1.03168774f) ? 10 : 13; break;
      case 10: node = (f[7] < -1.31314301f) ? 11 : 12; break;
      case 11: return -0.00172875f;
      case 12: return -0.08399276f;
      case 13: node = (f[2] < -2.37132335f) ? 14 : 15; break;
      case 14: return 0.11625268f;
      case 15: return -0.00276252f;
      case 16: node = (f[7] < -1.20972407f) ? 17 : 20; break;
      case 17: node = (f[3] < -0.02756707f) ? 18 : 19; break;
      case 18: return -0.13568127f;
      case 19: return -0.05520346f;
      case 20: return -0.23491037f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree47(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.10806866f) ? 1 : 16; break;
      case 1: node = (f[6] < 0.13935628f) ? 2 : 9; break;
      case 2: node = (f[20] < 0.20852819f) ? 3 : 6; break;
      case 3: node = (f[14] < -0.25217801f) ? 4 : 5; break;
      case 4: return 0.10602791f;
      case 5: return 0.00530431f;
      case 6: node = (f[0] < -1.44532883f) ? 7 : 8; break;
      case 7: return -0.06857003f;
      case 8: return -0.00552439f;
      case 9: node = (f[20] < -1.04686511f) ? 10 : 13; break;
      case 10: node = (f[3] < 2.66491127f) ? 11 : 12; break;
      case 11: return -0.01559950f;
      case 12: return 0.15456049f;
      case 13: node = (f[8] < -0.42737547f) ? 14 : 15; break;
      case 14: return -0.11777245f;
      case 15: return -0.03199202f;
      case 16: node = (f[1] < -0.57447523f) ? 17 : 22; break;
      case 17: node = (f[20] < 1.29448617f) ? 18 : 21; break;
      case 18: node = (f[6] < 0.64310080f) ? 19 : 20; break;
      case 19: return 0.20795858f;
      case 20: return 0.08060113f;
      case 21: return -0.02792914f;
      case 22: node = (f[0] < 0.77052677f) ? 23 : 26; break;
      case 23: node = (f[15] < 0.80799144f) ? 24 : 25; break;
      case 24: return 0.01117719f;
      case 25: return -0.09632295f;
      case 26: node = (f[6] < 0.64310080f) ? 27 : 28; break;
      case 27: return 0.07006873f;
      case 28: return 0.01768089f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree48(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.00064955f) ? 1 : 10; break;
      case 1: node = (f[10] < -3.61609817f) ? 2 : 3; break;
      case 2: return 0.16929147f;
      case 3: node = (f[0] < -1.41482818f) ? 4 : 7; break;
      case 4: node = (f[7] < -1.25911689f) ? 5 : 6; break;
      case 5: return -0.05509404f;
      case 6: return -0.15280706f;
      case 7: node = (f[8] < -0.32324526f) ? 8 : 9; break;
      case 8: return -0.06630902f;
      case 9: return 0.01342984f;
      case 10: node = (f[2] < -0.12887126f) ? 11 : 18; break;
      case 11: node = (f[6] < -1.22123706f) ? 12 : 15; break;
      case 12: node = (f[9] < -0.16481839f) ? 13 : 14; break;
      case 13: return 0.19353914f;
      case 14: return 0.08648846f;
      case 15: node = (f[8] < -0.15195441f) ? 16 : 17; break;
      case 16: return 0.09928316f;
      case 17: return 0.00000000f;
      case 18: node = (f[0] < 0.78266633f) ? 19 : 22; break;
      case 19: node = (f[6] < -0.85164899f) ? 20 : 21; break;
      case 20: return 0.05927573f;
      case 21: return -0.03381617f;
      case 22: node = (f[6] < 0.64310080f) ? 23 : 24; break;
      case 23: return 0.06103859f;
      case 24: return 0.00826595f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree49(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.08806223f) ? 1 : 16; break;
      case 1: node = (f[8] < -0.35360712f) ? 2 : 9; break;
      case 2: node = (f[3] < 2.30533409f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.92826486f) ? 4 : 5; break;
      case 4: return -0.10054747f;
      case 5: return -0.00612153f;
      case 6: node = (f[6] < 1.12435651f) ? 7 : 8; break;
      case 7: return 0.09132607f;
      case 8: return -0.05679395f;
      case 9: node = (f[0] < -1.56105375f) ? 10 : 13; break;
      case 10: node = (f[8] < 0.01825289f) ? 11 : 12; break;
      case 11: return -0.09224576f;
      case 12: return 0.00058406f;
      case 13: node = (f[5] < 2.05325508f) ? 14 : 15; break;
      case 14: return 0.00219407f;
      case 15: return 0.23405770f;
      case 16: node = (f[10] < 0.43481380f) ? 17 : 24; break;
      case 17: node = (f[1] < -1.22715998f) ? 18 : 21; break;
      case 18: node = (f[8] < -0.51266807f) ? 19 : 20; break;
      case 19: return 0.21585457f;
      case 20: return 0.09247484f;
      case 21: node = (f[6] < 1.37799954f) ? 22 : 23; break;
      case 22: return 0.04589874f;
      case 23: return -0.04468729f;
      case 24: node = (f[0] < 1.12415278f) ? 25 : 28; break;
      case 25: node = (f[15] < 0.92554015f) ? 26 : 27; break;
      case 26: return -0.01338190f;
      case 27: return -0.12068236f;
      case 28: node = (f[18] < -0.76414233f) ? 29 : 30; break;
      case 29: return 0.07784650f;
      case 30: return 0.01328125f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree50(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.19761161f) ? 1 : 14; break;
      case 1: node = (f[2] < 0.61100149f) ? 2 : 9; break;
      case 2: node = (f[0] < -1.77693200f) ? 3 : 6; break;
      case 3: node = (f[7] < -1.20972407f) ? 4 : 5; break;
      case 4: return -0.05041293f;
      case 5: return -0.19789617f;
      case 6: node = (f[1] < -3.78068137f) ? 7 : 8; break;
      case 7: return 0.18729550f;
      case 8: return -0.01258878f;
      case 9: node = (f[8] < 0.03427539f) ? 10 : 13; break;
      case 10: node = (f[18] < -0.11245257f) ? 11 : 12; break;
      case 11: return -0.05165719f;
      case 12: return -0.14669234f;
      case 13: return -0.03766292f;
      case 14: node = (f[3] < 1.91780651f) ? 15 : 22; break;
      case 15: node = (f[6] < -0.95756620f) ? 16 : 19; break;
      case 16: node = (f[17] < -1.04035079f) ? 17 : 18; break;
      case 17: return -0.09383069f;
      case 18: return 0.08512192f;
      case 19: node = (f[0] < 0.78266633f) ? 20 : 21; break;
      case 20: return -0.01976489f;
      case 21: return 0.03192924f;
      case 22: node = (f[6] < 1.07001638f) ? 23 : 24; break;
      case 23: return 0.21769364f;
      case 24: return 0.04974298f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree51(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.53071094f) ? 1 : 16; break;
      case 1: node = (f[3] < 1.10376871f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.53794485f) ? 3 : 6; break;
      case 3: node = (f[16] < 0.78408527f) ? 4 : 5; break;
      case 4: return -0.04646463f;
      case 5: return -0.15451863f;
      case 6: node = (f[0] < -1.44532883f) ? 7 : 8; break;
      case 7: return -0.07131641f;
      case 8: return -0.00574990f;
      case 9: node = (f[0] < -2.11986208f) ? 10 : 13; break;
      case 10: node = (f[11] < 1.99105608f) ? 11 : 12; break;
      case 11: return -0.01947247f;
      case 12: return -0.16150103f;
      case 13: node = (f[6] < 1.12435651f) ? 14 : 15; break;
      case 14: return 0.10188645f;
      case 15: return -0.03876762f;
      case 16: node = (f[2] < -0.30832160f) ? 17 : 22; break;
      case 17: node = (f[8] < 1.84223199f) ? 18 : 21; break;
      case 18: node = (f[2] < -0.64026046f) ? 19 : 20; break;
      case 19: return 0.18844925f;
      case 20: return 0.09093022f;
      case 21: return -0.01254617f;
      case 22: node = (f[0] < 1.26637709f) ? 23 : 26; break;
      case 23: node = (f[6] < -1.30405152f) ? 24 : 25; break;
      case 24: return 0.08197159f;
      case 25: return 0.00749658f;
      case 26: node = (f[10] < 0.72732907f) ? 27 : 28; break;
      case 27: return 0.13104773f;
      case 28: return 0.05248617f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree52(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.22979137f) ? 1 : 14; break;
      case 1: node = (f[5] < 2.22807026f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.58242869f) ? 3 : 6; break;
      case 3: node = (f[11] < -0.65186155f) ? 4 : 5; break;
      case 4: return -0.04276317f;
      case 5: return -0.15003231f;
      case 6: node = (f[1] < 0.64784396f) ? 7 : 8; break;
      case 7: return -0.01639205f;
      case 8: return -0.10822304f;
      case 9: node = (f[0] < -2.11986208f) ? 10 : 11; break;
      case 10: return -0.09705615f;
      case 11: node = (f[18] < -1.02481830f) ? 12 : 13; break;
      case 12: return 0.07544363f;
      case 13: return 0.27197990f;
      case 14: node = (f[3] < 1.97729218f) ? 15 : 22; break;
      case 15: node = (f[7] < 0.00780823f) ? 16 : 19; break;
      case 16: node = (f[20] < 0.47524613f) ? 17 : 18; break;
      case 17: return 0.07179178f;
      case 18: return 0.00391391f;
      case 19: node = (f[0] < 0.77052677f) ? 20 : 21; break;
      case 20: return -0.02330161f;
      case 21: return 0.02592446f;
      case 22: node = (f[8] < -0.37961528f) ? 23 : 24; break;
      case 23: return 0.20965572f;
      case 24: return 0.06761762f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree53(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.74684000f) ? 1 : 16; break;
      case 1: node = (f[4] < 1.12238908f) ? 2 : 9; break;
      case 2: node = (f[7] < -1.25911689f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.34084296f) ? 4 : 5; break;
      case 4: return -0.03488050f;
      case 5: return 0.03068275f;
      case 6: node = (f[0] < -1.41482818f) ? 7 : 8; break;
      case 7: return -0.11583199f;
      case 8: return -0.04982588f;
      case 9: node = (f[3] < 1.06750596f) ? 10 : 13; break;
      case 10: node = (f[7] < -1.30770004f) ? 11 : 12; break;
      case 11: return 0.03291768f;
      case 12: return -0.07828622f;
      case 13: node = (f[0] < -2.14613175f) ? 14 : 15; break;
      case 14: return -0.00453233f;
      case 15: return 0.15838783f;
      case 16: node = (f[6] < -1.27636552f) ? 17 : 22; break;
      case 17: node = (f[2] < -0.09870844f) ? 18 : 19; break;
      case 18: return 0.15991035f;
      case 19: node = (f[5] < -0.10275593f) ? 20 : 21; break;
      case 20: return 0.08798160f;
      case 21: return 0.01783708f;
      case 22: node = (f[11] < -0.03009925f) ? 23 : 26; break;
      case 23: node = (f[0] < 1.12415278f) ? 24 : 25; break;
      case 24: return -0.01820998f;
      case 25: return 0.04575527f;
      case 26: node = (f[6] < 1.27193367f) ? 27 : 28; break;
      case 27: return 0.04413325f;
      case 28: return -0.02257745f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree54(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.06836943f) ? 1 : 16; break;
      case 1: node = (f[6] < -0.56850463f) ? 2 : 9; break;
      case 2: node = (f[20] < 0.02771215f) ? 3 : 6; break;
      case 3: node = (f[8] < 0.02940296f) ? 4 : 5; break;
      case 4: return 0.15280475f;
      case 5: return 0.03352960f;
      case 6: node = (f[19] < -0.76490778f) ? 7 : 8; break;
      case 7: return -0.07871722f;
      case 8: return -0.00182943f;
      case 9: node = (f[2] < -2.25727010f) ? 10 : 13; break;
      case 10: node = (f[0] < -0.32362524f) ? 11 : 12; break;
      case 11: return -0.01044670f;
      case 12: return 0.13700542f;
      case 13: node = (f[15] < 0.49268466f) ? 14 : 15; break;
      case 14: return -0.05245902f;
      case 15: return -0.11163376f;
      case 16: node = (f[1] < -1.22715998f) ? 17 : 20; break;
      case 17: node = (f[6] < 0.84721720f) ? 18 : 19; break;
      case 18: return 0.18904830f;
      case 19: return 0.09610028f;
      case 20: node = (f[1] < 0.81749457f) ? 21 : 24; break;
      case 21: node = (f[6] < -1.30405152f) ? 22 : 23; break;
      case 22: return 0.08783104f;
      case 23: return 0.01504503f;
      case 24: node = (f[0] < 0.86612368f) ? 25 : 26; break;
      case 25: return -0.06427136f;
      case 26: return -0.00264098f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree55(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.01231460f) ? 1 : 10; break;
      case 1: node = (f[10] < -3.61609817f) ? 2 : 3; break;
      case 2: return 0.16090113f;
      case 3: node = (f[6] < -0.84230620f) ? 4 : 7; break;
      case 4: node = (f[19] < 0.92826486f) ? 5 : 6; break;
      case 5: return -0.01088940f;
      case 6: return 0.09569785f;
      case 7: node = (f[2] < -2.25727010f) ? 8 : 9; break;
      case 8: return 0.01951939f;
      case 9: return -0.04941842f;
      case 10: node = (f[10] < 0.08197969f) ? 11 : 18; break;
      case 11: node = (f[1] < -1.12461972f) ? 12 : 15; break;
      case 12: node = (f[4] < 0.58598638f) ? 13 : 14; break;
      case 13: return 0.07313067f;
      case 14: return 0.17198229f;
      case 15: node = (f[6] < 0.99474955f) ? 16 : 17; break;
      case 16: return 0.06515123f;
      case 17: return 0.00425706f;
      case 18: node = (f[0] < 1.29616296f) ? 19 : 22; break;
      case 19: node = (f[15] < 0.98282456f) ? 20 : 21; break;
      case 20: return -0.00394696f;
      case 21: return -0.15762004f;
      case 22: node = (f[10] < 0.47821850f) ? 23 : 24; break;
      case 23: return 0.15021443f;
      case 24: return 0.05510281f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree56(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -1.44532883f) ? 1 : 16; break;
      case 1: node = (f[7] < -1.25911689f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.68882918f) ? 3 : 6; break;
      case 3: node = (f[20] < 1.47136438f) ? 4 : 5; break;
      case 4: return -0.03540701f;
      case 5: return 0.04779081f;
      case 6: node = (f[13] < 1.11785507f) ? 7 : 8; break;
      case 7: return -0.12587900f;
      case 8: return -0.03193820f;
      case 9: node = (f[15] < -0.92899644f) ? 10 : 13; break;
      case 10: node = (f[18] < 2.98959088f) ? 11 : 12; break;
      case 11: return 0.04245850f;
      case 12: return -0.10446036f;
      case 13: node = (f[2] < -0.89725965f) ? 14 : 15; break;
      case 14: return -0.18177319f;
      case 15: return -0.08368842f;
      case 16: node = (f[1] < 0.80384761f) ? 17 : 24; break;
      case 17: node = (f[6] < -1.30405152f) ? 18 : 21; break;
      case 18: node = (f[17] < -0.39651462f) ? 19 : 20; break;
      case 19: return 0.10200696f;
      case 20: return 0.03310913f;
      case 21: node = (f[11] < 0.76028210f) ? 22 : 23; break;
      case 22: return 0.00122102f;
      case 23: return 0.04732903f;
      case 24: node = (f[20] < 0.47524613f) ? 25 : 28; break;
      case 25: node = (f[0] < 0.90639782f) ? 26 : 27; break;
      case 26: return -0.05458980f;
      case 27: return 0.00003814f;
      case 28: return -0.19094218f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree57(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 1.06750596f) ? 1 : 16; break;
      case 1: node = (f[0] < 0.77052677f) ? 2 : 9; break;
      case 2: node = (f[16] < 0.91590625f) ? 3 : 6; break;
      case 3: node = (f[6] < -0.85164899f) ? 4 : 5; break;
      case 4: return 0.01219968f;
      case 5: return -0.02525795f;
      case 6: node = (f[5] < 1.22086525f) ? 7 : 8; break;
      case 7: return -0.11168501f;
      case 8: return -0.00755466f;
      case 9: node = (f[6] < 0.64310080f) ? 10 : 13; break;
      case 10: node = (f[17] < -0.85948110f) ? 11 : 12; break;
      case 11: return 0.07296526f;
      case 12: return 0.02340910f;
      case 13: node = (f[6] < 0.99474955f) ? 14 : 15; break;
      case 14: return -0.09613647f;
      case 15: return 0.00371962f;
      case 16: node = (f[17] < 0.35065708f) ? 17 : 22; break;
      case 17: node = (f[18] < 0.46103445f) ? 18 : 21; break;
      case 18: node = (f[0] < -0.15611355f) ? 19 : 20; break;
      case 19: return 0.00305320f;
      case 20: return 0.09171374f;
      case 21: return 0.26256985f;
      case 22: node = (f[8] < 0.04685433f) ? 23 : 26; break;
      case 23: node = (f[8] < -0.52133203f) ? 24 : 25; break;
      case 24: return -0.04579219f;
      case 25: return 0.04733989f;
      case 26: node = (f[5] < -0.30972740f) ? 27 : 28; break;
      case 27: return 0.01815002f;
      case 28: return -0.06390402f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree58(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 0.78266633f) ? 1 : 16; break;
      case 1: node = (f[16] < 0.81375021f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.85164899f) ? 3 : 6; break;
      case 3: node = (f[20] < 0.02771215f) ? 4 : 5; break;
      case 4: return 0.09852509f;
      case 5: return 0.00500150f;
      case 6: node = (f[20] < -1.43988466f) ? 7 : 8; break;
      case 7: return 0.07291813f;
      case 8: return -0.01797160f;
      case 9: node = (f[8] < -0.52490735f) ? 10 : 13; break;
      case 10: node = (f[20] < -0.55242354f) ? 11 : 12; break;
      case 11: return -0.07380254f;
      case 12: return -0.15732579f;
      case 13: node = (f[10] < 0.96972376f) ? 14 : 15; break;
      case 14: return -0.01187222f;
      case 15: return -0.17566206f;
      case 16: node = (f[8] < 2.01444674f) ? 17 : 22; break;
      case 17: node = (f[1] < 1.07075989f) ? 18 : 21; break;
      case 18: node = (f[3] < -0.30980888f) ? 19 : 20; break;
      case 19: return 0.02532434f;
      case 20: return 0.06739668f;
      case 21: return -0.07226331f;
      case 22: node = (f[0] < 0.97604245f) ? 23 : 26; break;
      case 23: node = (f[3] < -0.90555721f) ? 24 : 25; break;
      case 24: return -0.02227407f;
      case 25: return 0.00420336f;
      case 26: return -0.06199019f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree59(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < 1.41350591f) ? 1 : 14; break;
      case 1: node = (f[20] < 2.06902266f) ? 2 : 9; break;
      case 2: node = (f[11] < -0.04815195f) ? 3 : 6; break;
      case 3: node = (f[14] < 0.07920409f) ? 4 : 5; break;
      case 4: return -0.03112202f;
      case 5: return 0.00173058f;
      case 6: node = (f[14] < -3.15854955f) ? 7 : 8; break;
      case 7: return -0.09574973f;
      case 8: return 0.02812699f;
      case 9: node = (f[8] < -0.02685456f) ? 10 : 13; break;
      case 10: node = (f[15] < -0.15599723f) ? 11 : 12; break;
      case 11: return -0.13611145f;
      case 12: return -0.06065218f;
      case 13: return -0.01435966f;
      case 14: node = (f[15] < 0.04426175f) ? 15 : 20; break;
      case 15: node = (f[7] < 0.95236480f) ? 16 : 17; break;
      case 16: return 0.06216191f;
      case 17: node = (f[15] < -1.21251988f) ? 18 : 19; break;
      case 18: return -0.00879139f;
      case 19: return -0.06808639f;
      case 20: node = (f[18] < -0.42526367f) ? 21 : 24; break;
      case 21: node = (f[12] < -0.75322080f) ? 22 : 23; break;
      case 22: return -0.02380731f;
      case 23: return -0.07378318f;
      case 24: return -0.15032925f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree60(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[1] < 0.90860736f) ? 1 : 16; break;
      case 1: node = (f[0] < -0.04992451f) ? 2 : 9; break;
      case 2: node = (f[6] < 0.13935628f) ? 3 : 6; break;
      case 3: node = (f[20] < 0.20852819f) ? 4 : 5; break;
      case 4: return 0.06199222f;
      case 5: return -0.01329172f;
      case 6: node = (f[3] < 2.76634240f) ? 7 : 8; break;
      case 7: return -0.05623488f;
      case 8: return 0.08639643f;
      case 9: node = (f[1] < -1.12461972f) ? 10 : 13; break;
      case 10: node = (f[0] < 0.12883672f) ? 11 : 12; break;
      case 11: return 0.03383510f;
      case 12: return 0.13654205f;
      case 13: node = (f[6] < 1.41350591f) ? 14 : 15; break;
      case 14: return 0.01691758f;
      case 15: return -0.04182361f;
      case 16: node = (f[0] < 0.46470219f) ? 17 : 24; break;
      case 17: node = (f[18] < 0.48710203f) ? 18 : 21; break;
      case 18: node = (f[9] < 2.14264894f) ? 19 : 20; break;
      case 19: return -0.15858126f;
      case 20: return -0.05647023f;
      case 21: node = (f[5] < -1.69749093f) ? 22 : 23; break;
      case 22: return -0.07403656f;
      case 23: return 0.00000000f;
      case 24: node = (f[1] < 1.29882646f) ? 25 : 28; break;
      case 25: node = (f[3] < -0.00101682f) ? 26 : 27; break;
      case 26: return -0.02107664f;
      case 27: return 0.03279327f;
      case 28: return -0.07894967f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree61(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -2.11986208f) ? 1 : 8; break;
      case 1: node = (f[7] < -1.20950544f) ? 2 : 7; break;
      case 2: node = (f[12] < -0.95703226f) ? 3 : 4; break;
      case 3: return 0.01119205f;
      case 4: node = (f[9] < -0.86610794f) ? 5 : 6; break;
      case 5: return -0.02404670f;
      case 6: return -0.09522922f;
      case 7: return -0.18622208f;
      case 8: node = (f[2] < -2.37132335f) ? 9 : 16; break;
      case 9: node = (f[6] < 0.98878938f) ? 10 : 13; break;
      case 10: node = (f[19] < 0.56856203f) ? 11 : 12; break;
      case 11: return 0.17981300f;
      case 12: return 0.03595189f;
      case 13: node = (f[15] < 0.35293394f) ? 14 : 15; break;
      case 14: return -0.08425265f;
      case 15: return 0.02846612f;
      case 16: node = (f[19] < 1.03103709f) ? 17 : 20; break;
      case 17: node = (f[0] < 0.68694162f) ? 18 : 19; break;
      case 18: return -0.01639161f;
      case 19: return 0.01851896f;
      case 20: node = (f[19] < 3.08391261f) ? 21 : 22; break;
      case 21: return 0.08051480f;
      case 22: return -0.02429334f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree62(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[1] < 0.87893468f) ? 1 : 16; break;
      case 1: node = (f[13] < 1.24217975f) ? 2 : 9; break;
      case 2: node = (f[6] < -1.13900042f) ? 3 : 6; break;
      case 3: node = (f[6] < -1.98422635f) ? 4 : 5; break;
      case 4: return -0.02948956f;
      case 5: return 0.04707730f;
      case 6: node = (f[7] < -1.03168774f) ? 7 : 8; break;
      case 7: return -0.03812981f;
      case 8: return -0.00032359f;
      case 9: node = (f[6] < 1.27193367f) ? 10 : 13; break;
      case 10: node = (f[16] < 0.40605411f) ? 11 : 12; break;
      case 11: return 0.06826644f;
      case 12: return -0.00588816f;
      case 13: node = (f[9] < 1.94565201f) ? 14 : 15; break;
      case 14: return 0.03424063f;
      case 15: return -0.05791854f;
      case 16: node = (f[14] < 1.23904145f) ? 17 : 22; break;
      case 17: node = (f[16] < 0.50547671f) ? 18 : 21; break;
      case 18: node = (f[5] < -1.69749093f) ? 19 : 20; break;
      case 19: return -0.08249141f;
      case 20: return -0.01533970f;
      case 21: return -0.12548087f;
      case 22: node = (f[10] < 1.20179582f) ? 23 : 24; break;
      case 23: return 0.03213550f;
      case 24: return -0.00515955f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree63(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.67061728f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.56105375f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.03428793f) ? 3 : 6; break;
      case 3: node = (f[18] < 0.04395298f) ? 4 : 5; break;
      case 4: return -0.00449347f;
      case 5: return -0.08926641f;
      case 6: node = (f[4] < 1.12238908f) ? 7 : 8; break;
      case 7: return -0.00787005f;
      case 8: return 0.07915827f;
      case 9: node = (f[4] < -0.59658873f) ? 10 : 13; break;
      case 10: node = (f[3] < 1.46462250f) ? 11 : 12; break;
      case 11: return 0.04081802f;
      case 12: return 0.11530080f;
      case 13: node = (f[2] < -2.81412983f) ? 14 : 15; break;
      case 14: return 0.09534363f;
      case 15: return 0.00496489f;
      case 16: node = (f[17] < -1.04516220f) ? 17 : 18; break;
      case 17: return -0.21125482f;
      case 18: node = (f[0] < -0.18671463f) ? 19 : 22; break;
      case 19: node = (f[12] < 1.21698403f) ? 20 : 21; break;
      case 20: return -0.09816485f;
      case 21: return -0.01610665f;
      case 22: node = (f[5] < -1.61399472f) ? 23 : 24; break;
      case 23: return -0.06221167f;
      case 24: return -0.00092571f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree64(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.76490778f) ? 1 : 16; break;
      case 1: node = (f[0] < 0.56607735f) ? 2 : 9; break;
      case 2: node = (f[7] < 1.10202527f) ? 3 : 6; break;
      case 3: node = (f[17] < -0.70003116f) ? 4 : 5; break;
      case 4: return -0.16731058f;
      case 5: return -0.06475861f;
      case 6: node = (f[0] < 0.08063146f) ? 7 : 8; break;
      case 7: return -0.01663468f;
      case 8: return 0.04814076f;
      case 9: node = (f[20] < -0.12404443f) ? 10 : 13; break;
      case 10: node = (f[9] < -0.56868696f) ? 11 : 12; break;
      case 11: return -0.07400469f;
      case 12: return -0.00603614f;
      case 13: node = (f[0] < 0.89170259f) ? 14 : 15; break;
      case 14: return 0.07844295f;
      case 15: return 0.00684231f;
      case 16: node = (f[3] < 0.20741622f) ? 17 : 24; break;
      case 17: node = (f[0] < 0.89170259f) ? 18 : 21; break;
      case 18: node = (f[6] < -0.56850463f) ? 19 : 20; break;
      case 19: return 0.00579911f;
      case 20: return -0.03960922f;
      case 21: node = (f[18] < -0.84234512f) ? 22 : 23; break;
      case 22: return 0.05140075f;
      case 23: return 0.00805016f;
      case 24: node = (f[0] < 0.00892831f) ? 25 : 28; break;
      case 25: node = (f[7] < -0.04431089f) ? 26 : 27; break;
      case 26: return 0.04392893f;
      case 27: return -0.02990433f;
      case 28: node = (f[8] < -0.02685456f) ? 29 : 30; break;
      case 29: return 0.09329371f;
      case 30: return -0.01515314f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree65(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.19761161f) ? 1 : 8; break;
      case 1: node = (f[5] < 2.53058314f) ? 2 : 7; break;
      case 2: node = (f[6] < 1.13505936f) ? 3 : 6; break;
      case 3: node = (f[8] < -0.58503956f) ? 4 : 5; break;
      case 4: return -0.07402301f;
      case 5: return -0.00996253f;
      case 6: return -0.14875583f;
      case 7: return 0.13474059f;
      case 8: node = (f[1] < -1.12461972f) ? 9 : 14; break;
      case 9: node = (f[17] < -0.24002477f) ? 10 : 13; break;
      case 10: node = (f[13] < 0.78518856f) ? 11 : 12; break;
      case 11: return 0.13741586f;
      case 12: return 0.05266642f;
      case 13: return -0.00553792f;
      case 14: node = (f[1] < 0.67650700f) ? 15 : 18; break;
      case 15: node = (f[8] < 1.84223199f) ? 16 : 17; break;
      case 16: return 0.01993950f;
      case 17: return -0.02317979f;
      case 18: node = (f[17] < -1.04283082f) ? 19 : 20; break;
      case 19: return -0.17615533f;
      case 20: return -0.01043031f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree66(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.19761161f) ? 1 : 16; break;
      case 1: node = (f[8] < -0.31319749f) ? 2 : 9; break;
      case 2: node = (f[20] < -0.41892058f) ? 3 : 6; break;
      case 3: node = (f[0] < -0.32362524f) ? 4 : 5; break;
      case 4: return 0.01272525f;
      case 5: return -0.06856669f;
      case 6: node = (f[6] < 0.02756617f) ? 7 : 8; break;
      case 7: return -0.02009871f;
      case 8: return -0.08962645f;
      case 9: node = (f[20] < 2.06902266f) ? 10 : 13; break;
      case 10: node = (f[18] < 2.96352315f) ? 11 : 12; break;
      case 11: return 0.00905324f;
      case 12: return -0.08178794f;
      case 13: node = (f[8] < -0.02685456f) ? 14 : 15; break;
      case 14: return -0.08607651f;
      case 15: return 0.00230166f;
      case 16: node = (f[6] < -0.95756620f) ? 17 : 22; break;
      case 17: node = (f[10] < 1.04832482f) ? 18 : 21; break;
      case 18: node = (f[15] < 0.59055114f) ? 19 : 20; break;
      case 19: return 0.04068507f;
      case 20: return 0.09042465f;
      case 21: return -0.05429248f;
      case 22: node = (f[7] < -1.16357005f) ? 23 : 24; break;
      case 23: return -0.12326360f;
      case 24: node = (f[10] < 0.72732907f) ? 25 : 26; break;
      case 25: return 0.01323799f;
      case 26: return -0.01865058f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree67(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.76490778f) ? 1 : 16; break;
      case 1: node = (f[20] < -1.39150190f) ? 2 : 9; break;
      case 2: node = (f[15] < 0.31998753f) ? 3 : 6; break;
      case 3: node = (f[17] < -0.28191289f) ? 4 : 5; break;
      case 4: return 0.09842376f;
      case 5: return 0.01063349f;
      case 6: node = (f[8] < -0.47735536f) ? 7 : 8; break;
      case 7: return -0.03146051f;
      case 8: return 0.00549891f;
      case 9: node = (f[0] < 0.68694162f) ? 10 : 13; break;
      case 10: node = (f[17] < -0.24928087f) ? 11 : 12; break;
      case 11: return -0.10619540f;
      case 12: return -0.03430354f;
      case 13: node = (f[8] < 2.26008081f) ? 14 : 15; break;
      case 14: return 0.01798626f;
      case 15: return -0.07198383f;
      case 16: node = (f[11] < -0.07837361f) ? 17 : 24; break;
      case 17: node = (f[0] < 1.27962685f) ? 18 : 21; break;
      case 18: node = (f[16] < 0.85424537f) ? 19 : 20; break;
      case 19: return -0.00351980f;
      case 20: return -0.04647437f;
      case 21: node = (f[19] < -0.30757129f) ? 22 : 23; break;
      case 22: return -0.00085438f;
      case 23: return 0.06451722f;
      case 24: node = (f[19] < -0.70067513f) ? 25 : 28; break;
      case 25: node = (f[17] < 0.39599186f) ? 26 : 27; break;
      case 26: return 0.20290691f;
      case 27: return 0.04352369f;
      case 28: node = (f[20] < 0.32611182f) ? 29 : 30; break;
      case 29: return 0.03185277f;
      case 30: return -0.01652863f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree68(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.76490778f) ? 1 : 14; break;
      case 1: node = (f[20] < -1.39150190f) ? 2 : 7; break;
      case 2: node = (f[0] < 0.80936134f) ? 3 : 6; break;
      case 3: node = (f[4] < -0.54705548f) ? 4 : 5; break;
      case 4: return 0.08357220f;
      case 5: return 0.01421972f;
      case 6: return -0.02260575f;
      case 7: node = (f[0] < 0.61538023f) ? 8 : 11; break;
      case 8: node = (f[10] < -1.79449582f) ? 9 : 10; break;
      case 9: return -0.13665515f;
      case 10: return -0.04954411f;
      case 11: node = (f[12] < -0.72568268f) ? 12 : 13; break;
      case 12: return -0.06841015f;
      case 13: return 0.02438384f;
      case 14: node = (f[3] < 0.26067138f) ? 15 : 22; break;
      case 15: node = (f[0] < 0.78266633f) ? 16 : 19; break;
      case 16: node = (f[8] < -0.56044453f) ? 17 : 18; break;
      case 17: return -0.05777961f;
      case 18: return -0.00798764f;
      case 19: node = (f[0] < 1.36155272f) ? 20 : 21; break;
      case 20: return 0.01279438f;
      case 21: return 0.07806635f;
      case 22: node = (f[12] < 1.76075077f) ? 23 : 26; break;
      case 23: node = (f[0] < -0.04992451f) ? 24 : 25; break;
      case 24: return -0.00319074f;
      case 25: return 0.04471847f;
      case 26: node = (f[18] < 0.43496686f) ? 27 : 28; break;
      case 27: return 0.06153470f;
      case 28: return 0.16379604f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree69(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.84766924f) ? 1 : 16; break;
      case 1: node = (f[0] < 0.78266633f) ? 2 : 9; break;
      case 2: node = (f[15] < 0.79708278f) ? 3 : 6; break;
      case 3: node = (f[0] < -1.35619307f) ? 4 : 5; break;
      case 4: return -0.03987879f;
      case 5: return -0.00101020f;
      case 6: node = (f[6] < -1.41793764f) ? 7 : 8; break;
      case 7: return 0.07716703f;
      case 8: return -0.06197894f;
      case 9: node = (f[1] < -0.20065025f) ? 10 : 13; break;
      case 10: node = (f[0] < 0.92349899f) ? 11 : 12; break;
      case 11: return 0.11075245f;
      case 12: return 0.04173121f;
      case 13: node = (f[0] < 1.36155272f) ? 14 : 15; break;
      case 14: return 0.00418144f;
      case 15: return 0.06494968f;
      case 16: node = (f[6] < 1.27193367f) ? 17 : 24; break;
      case 17: node = (f[0] < -2.34593511f) ? 18 : 21; break;
      case 18: node = (f[15] < -2.93481588f) ? 19 : 20; break;
      case 19: return 0.00000000f;
      case 20: return -0.14354812f;
      case 21: node = (f[10] < -2.42573285f) ? 22 : 23; break;
      case 22: return 0.14214089f;
      case 23: return 0.03559577f;
      case 24: node = (f[19] < 0.67390358f) ? 25 : 28; break;
      case 25: node = (f[0] < 0.36583281f) ? 26 : 27; break;
      case 26: return -0.09046344f;
      case 27: return 0.01075516f;
      case 28: return 0.09314670f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree70(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[1] < 0.90860736f) ? 1 : 16; break;
      case 1: node = (f[0] < -1.52173412f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.01669395f) ? 3 : 6; break;
      case 3: node = (f[9] < -0.45846570f) ? 4 : 5; break;
      case 4: return -0.00676939f;
      case 5: return -0.08082178f;
      case 6: node = (f[4] < 1.09052849f) ? 7 : 8; break;
      case 7: return -0.01470879f;
      case 8: return 0.07485805f;
      case 9: node = (f[6] < -1.41793764f) ? 10 : 13; break;
      case 10: node = (f[18] < -0.19065535f) ? 11 : 12; break;
      case 11: return 0.09020480f;
      case 12: return -0.00162537f;
      case 13: node = (f[8] < 1.84223199f) ? 14 : 15; break;
      case 14: return 0.00773921f;
      case 15: return -0.03091663f;
      case 16: node = (f[6] < -0.84230620f) ? 17 : 18; break;
      case 17: return -0.13932556f;
      case 18: node = (f[18] < 0.61743998f) ? 19 : 22; break;
      case 19: node = (f[14] < 1.01083970f) ? 20 : 21; break;
      case 20: return -0.06118954f;
      case 21: return -0.00938830f;
      case 22: node = (f[9] < 0.33060017f) ? 23 : 24; break;
      case 23: return 0.01250408f;
      case 24: return -0.02727569f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree71(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 2.30533409f) ? 1 : 16; break;
      case 1: node = (f[6] < 1.41350591f) ? 2 : 9; break;
      case 2: node = (f[1] < 0.56961012f) ? 3 : 6; break;
      case 3: node = (f[4] < -0.58372831f) ? 4 : 5; break;
      case 4: return 0.04935377f;
      case 5: return 0.00394390f;
      case 6: node = (f[17] < -1.04516220f) ? 7 : 8; break;
      case 7: return -0.16068917f;
      case 8: return -0.01137769f;
      case 9: node = (f[17] < -0.04837596f) ? 10 : 13; break;
      case 10: node = (f[13] < 1.11785507f) ? 11 : 12; break;
      case 11: return -0.05885664f;
      case 12: return -0.13315223f;
      case 13: node = (f[18] < 0.14822334f) ? 14 : 15; break;
      case 14: return 0.04774392f;
      case 15: return -0.03317405f;
      case 16: node = (f[6] < 0.99474955f) ? 17 : 22; break;
      case 17: node = (f[0] < -2.53131461f) ? 18 : 19; break;
      case 18: return 0.01201788f;
      case 19: node = (f[11] < 0.97937036f) ? 20 : 21; break;
      case 20: return 0.05028648f;
      case 21: return 0.15351421f;
      case 22: node = (f[12] < -0.89417374f) ? 23 : 24; break;
      case 23: return -0.04051977f;
      case 24: return 0.02757580f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree72(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.19761161f) ? 1 : 16; break;
      case 1: node = (f[8] < -0.50440323f) ? 2 : 9; break;
      case 2: node = (f[11] < -0.67466241f) ? 3 : 6; break;
      case 3: node = (f[20] < -0.23457502f) ? 4 : 5; break;
      case 4: return 0.02009583f;
      case 5: return -0.02103829f;
      case 6: node = (f[0] < -0.25583547f) ? 7 : 8; break;
      case 7: return -0.09426125f;
      case 8: return -0.01792542f;
      case 9: node = (f[2] < 0.35457411f) ? 10 : 13; break;
      case 10: node = (f[6] < 1.13505936f) ? 11 : 12; break;
      case 11: return 0.00470843f;
      case 12: return -0.09496325f;
      case 13: node = (f[9] < -0.31186327f) ? 14 : 15; break;
      case 14: return 0.01358766f;
      case 15: return -0.05551670f;
      case 16: node = (f[17] < -1.04516220f) ? 17 : 20; break;
      case 17: node = (f[0] < 0.68694162f) ? 18 : 19; break;
      case 18: return -0.16033229f;
      case 19: return 0.00000000f;
      case 20: node = (f[6] < -0.85164899f) ? 21 : 24; break;
      case 21: node = (f[3] < -0.26991782f) ? 22 : 23; break;
      case 22: return 0.02499621f;
      case 23: return 0.08403698f;
      case 24: node = (f[7] < -1.20950544f) ? 25 : 26; break;
      case 25: return -0.11973846f;
      case 26: return 0.00575303f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree73(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[1] < 0.90860736f) ? 1 : 16; break;
      case 1: node = (f[3] < 1.16219401f) ? 2 : 9; break;
      case 2: node = (f[19] < -0.89337307f) ? 3 : 6; break;
      case 3: node = (f[6] < -1.84265423f) ? 4 : 5; break;
      case 4: return 0.04283758f;
      case 5: return -0.04389528f;
      case 6: node = (f[6] < -1.13479328f) ? 7 : 8; break;
      case 7: return 0.02452269f;
      case 8: return -0.00155279f;
      case 9: node = (f[6] < 1.13505936f) ? 10 : 13; break;
      case 10: node = (f[11] < 0.06084879f) ? 11 : 12; break;
      case 11: return -0.00554545f;
      case 12: return 0.05279768f;
      case 13: node = (f[19] < 0.67390358f) ? 14 : 15; break;
      case 14: return -0.05978248f;
      case 15: return 0.07950256f;
      case 16: node = (f[6] < -0.84230620f) ? 17 : 18; break;
      case 17: return -0.12522873f;
      case 18: node = (f[19] < -0.76233846f) ? 19 : 22; break;
      case 19: node = (f[12] < 0.94137460f) ? 20 : 21; break;
      case 20: return -0.03432707f;
      case 21: return -0.10086718f;
      case 22: node = (f[19] < -0.35638812f) ? 23 : 24; break;
      case 23: return 0.02219690f;
      case 24: return -0.02521266f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree74(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.12518519f;
      case 2: node = (f[11] < 3.76436114f) ? 3 : 10; break;
      case 3: node = (f[1] < 0.90860736f) ? 4 : 7; break;
      case 4: node = (f[0] < 0.14112975f) ? 5 : 6; break;
      case 5: return -0.00662621f;
      case 6: return 0.01234516f;
      case 7: node = (f[6] < -0.84230620f) ? 8 : 9; break;
      case 8: return -0.11906909f;
      case 9: return -0.02725234f;
      case 10: return -0.13258344f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree75(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -2.11986208f) ? 1 : 10; break;
      case 1: node = (f[10] < -1.72223759f) ? 2 : 5; break;
      case 2: node = (f[0] < -2.53131461f) ? 3 : 4; break;
      case 3: return -0.14902492f;
      case 4: return -0.04960704f;
      case 5: node = (f[20] < 1.62516415f) ? 6 : 7; break;
      case 6: return -0.07886823f;
      case 7: node = (f[12] < -1.08838725f) ? 8 : 9; break;
      case 8: return 0.05264875f;
      case 9: return -0.02392217f;
      case 10: node = (f[3] < 1.16219401f) ? 11 : 18; break;
      case 11: node = (f[0] < 0.84094810f) ? 12 : 15; break;
      case 12: node = (f[16] < 0.91063923f) ? 13 : 14; break;
      case 13: return -0.00648642f;
      case 14: return -0.06041892f;
      case 15: node = (f[8] < 0.01825289f) ? 16 : 17; break;
      case 16: return 0.02617813f;
      case 17: return -0.00835441f;
      case 18: node = (f[7] < -0.04109630f) ? 19 : 22; break;
      case 19: node = (f[3] < 1.23134708f) ? 20 : 21; break;
      case 20: return 0.01481840f;
      case 21: return 0.12693274f;
      case 22: node = (f[0] < 0.01231460f) ? 23 : 24; break;
      case 23: return -0.01707400f;
      case 24: return 0.05744891f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree76(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 1.06750596f) ? 1 : 16; break;
      case 1: node = (f[19] < -0.76490778f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.45334566f) ? 3 : 6; break;
      case 3: node = (f[20] < 0.11814327f) ? 4 : 5; break;
      case 4: return 0.00190915f;
      case 5: return -0.06359567f;
      case 6: node = (f[12] < -0.31067491f) ? 7 : 8; break;
      case 7: return -0.08029236f;
      case 8: return -0.00750861f;
      case 9: node = (f[16] < -0.79775751f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.49707201f) ? 11 : 12; break;
      case 11: return 0.03760987f;
      case 12: return -0.00815096f;
      case 13: node = (f[15] < -0.69016039f) ? 14 : 15; break;
      case 14: return -0.08720391f;
      case 15: return -0.00175760f;
      case 16: node = (f[6] < 1.12435651f) ? 17 : 24; break;
      case 17: node = (f[4] < -0.33299223f) ? 18 : 21; break;
      case 18: node = (f[3] < 1.46462250f) ? 19 : 20; break;
      case 19: return 0.02696255f;
      case 20: return 0.10973404f;
      case 21: node = (f[4] < 1.38034356f) ? 22 : 23; break;
      case 22: return 0.00317223f;
      case 23: return 0.11330134f;
      case 24: node = (f[19] < 0.67390358f) ? 25 : 28; break;
      case 25: node = (f[6] < 1.27193367f) ? 26 : 27; break;
      case 26: return -0.00624038f;
      case 27: return -0.05613742f;
      case 28: return 0.07697472f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree77(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < -1.61399472f) ? 1 : 8; break;
      case 1: node = (f[6] < 0.99474955f) ? 2 : 5; break;
      case 2: node = (f[18] < 0.48710203f) ? 3 : 4; break;
      case 3: return -0.08118004f;
      case 4: return -0.02169394f;
      case 5: node = (f[7] < 1.05534494f) ? 6 : 7; break;
      case 6: return -0.02864929f;
      case 7: return 0.00025009f;
      case 8: node = (f[0] < -1.71415174f) ? 9 : 14; break;
      case 9: node = (f[7] < -1.16357005f) ? 10 : 13; break;
      case 10: node = (f[12] < -0.99032956f) ? 11 : 12; break;
      case 11: return 0.02814742f;
      case 12: return -0.03548690f;
      case 13: return -0.11110132f;
      case 14: node = (f[1] < -3.05226803f) ? 15 : 18; break;
      case 15: node = (f[6] < 0.98878938f) ? 16 : 17; break;
      case 16: return 0.13885862f;
      case 17: return -0.01185852f;
      case 18: node = (f[6] < -1.27636552f) ? 19 : 20; break;
      case 19: return 0.03662885f;
      case 20: return 0.00033861f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree78(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.11406051f;
      case 2: node = (f[0] < -0.15611355f) ? 3 : 10; break;
      case 3: node = (f[6] < -0.28536025f) ? 4 : 7; break;
      case 4: node = (f[20] < 0.00032074f) ? 5 : 6; break;
      case 5: return 0.10387284f;
      case 6: return -0.00970467f;
      case 7: node = (f[20] < 0.12960204f) ? 8 : 9; break;
      case 8: return -0.02115446f;
      case 9: return -0.08826192f;
      case 10: node = (f[10] < 0.59636879f) ? 11 : 14; break;
      case 11: node = (f[6] < 1.07001638f) ? 12 : 13; break;
      case 12: return 0.02701894f;
      case 13: return -0.00832003f;
      case 14: node = (f[17] < -1.04516220f) ? 15 : 16; break;
      case 15: return -0.11265466f;
      case 16: return -0.00792032f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree79(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 1.27962685f) ? 1 : 16; break;
      case 1: node = (f[19] < 0.93340349f) ? 2 : 9; break;
      case 2: node = (f[3] < 1.91780651f) ? 3 : 6; break;
      case 3: node = (f[0] < -0.15611355f) ? 4 : 5; break;
      case 4: return -0.02369686f;
      case 5: return -0.00296109f;
      case 6: node = (f[20] < 0.20491563f) ? 7 : 8; break;
      case 7: return 0.06725609f;
      case 8: return -0.01187898f;
      case 9: node = (f[19] < 3.08391261f) ? 10 : 13; break;
      case 10: node = (f[0] < -1.29359055f) ? 11 : 12; break;
      case 11: return -0.01905537f;
      case 12: return 0.05357701f;
      case 13: node = (f[0] < -1.35619307f) ? 14 : 15; break;
      case 14: return 0.02908658f;
      case 15: return -0.04717687f;
      case 16: node = (f[10] < 0.46043375f) ? 17 : 18; break;
      case 17: return 0.11271123f;
      case 18: node = (f[19] < -0.09688821f) ? 19 : 20; break;
      case 19: return -0.00656677f;
      case 20: node = (f[8] < -0.41129476f) ? 21 : 22; break;
      case 21: return 0.05709939f;
      case 22: return 0.02559401f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree80(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.76490778f) ? 1 : 14; break;
      case 1: node = (f[0] < 0.56607735f) ? 2 : 9; break;
      case 2: node = (f[9] < -0.81392258f) ? 3 : 6; break;
      case 3: node = (f[9] < -1.14108312f) ? 4 : 5; break;
      case 4: return -0.03097363f;
      case 5: return 0.03558136f;
      case 6: node = (f[20] < -1.01764619f) ? 7 : 8; break;
      case 7: return -0.00145625f;
      case 8: return -0.05936283f;
      case 9: node = (f[8] < 2.26008081f) ? 10 : 13; break;
      case 10: node = (f[1] < 0.61754799f) ? 11 : 12; break;
      case 11: return 0.02649828f;
      case 12: return -0.02262319f;
      case 13: return -0.05595204f;
      case 14: node = (f[3] < 0.20741622f) ? 15 : 22; break;
      case 15: node = (f[0] < 0.82716733f) ? 16 : 19; break;
      case 16: node = (f[8] < -0.06956737f) ? 17 : 18; break;
      case 17: return -0.02178764f;
      case 18: return 0.00882582f;
      case 19: node = (f[18] < -0.84234512f) ? 20 : 21; break;
      case 20: return 0.03540966f;
      case 21: return 0.00263309f;
      case 22: node = (f[4] < -0.35672170f) ? 23 : 26; break;
      case 23: node = (f[17] < 0.56226319f) ? 24 : 25; break;
      case 24: return 0.06881889f;
      case 25: return 0.00524831f;
      case 26: node = (f[0] < 0.54677588f) ? 27 : 28; break;
      case 27: return -0.00483311f;
      case 28: return 0.06313242f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree81(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < -3.04236531f) ? 1 : 8; break;
      case 1: node = (f[0] < -2.08200383f) ? 2 : 3; break;
      case 2: return -0.01634897f;
      case 3: node = (f[6] < 0.98878938f) ? 4 : 7; break;
      case 4: node = (f[10] < -1.98005402f) ? 5 : 6; break;
      case 5: return 0.20163387f;
      case 6: return 0.08402526f;
      case 7: return -0.00477622f;
      case 8: node = (f[0] < 0.09276102f) ? 9 : 16; break;
      case 9: node = (f[8] < -0.32324526f) ? 10 : 13; break;
      case 10: node = (f[15] < 0.75735801f) ? 11 : 12; break;
      case 11: return -0.02652911f;
      case 12: return -0.10621639f;
      case 13: node = (f[0] < -1.34084296f) ? 14 : 15; break;
      case 14: return -0.02177310f;
      case 15: return 0.01387625f;
      case 16: node = (f[20] < 1.37085974f) ? 17 : 20; break;
      case 17: node = (f[1] < -0.32915384f) ? 18 : 19; break;
      case 18: return 0.05007609f;
      case 19: return 0.00328981f;
      case 20: return -0.12068545f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree82(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.11666305f;
      case 2: node = (f[0] < -2.11986208f) ? 3 : 8; break;
      case 3: node = (f[12] < 0.96802700f) ? 4 : 7; break;
      case 4: node = (f[20] < 1.62516415f) ? 5 : 6; break;
      case 5: return -0.06188386f;
      case 6: return 0.00000000f;
      case 7: return -0.13151154f;
      case 8: node = (f[3] < -0.10299002f) ? 9 : 12; break;
      case 9: node = (f[0] < 0.77052677f) ? 10 : 11; break;
      case 10: return -0.01632577f;
      case 11: return 0.01005581f;
      case 12: node = (f[7] < -0.06114496f) ? 13 : 14; break;
      case 13: return 0.03583234f;
      case 14: return 0.00027895f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree83(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.11278767f;
      case 2: node = (f[10] < -3.47297621f) ? 3 : 4; break;
      case 3: return -0.12387960f;
      case 4: node = (f[0] < 1.27962685f) ? 5 : 8; break;
      case 5: node = (f[15] < 0.88310379f) ? 6 : 7; break;
      case 6: return -0.00005557f;
      case 7: return -0.03490882f;
      case 8: node = (f[10] < 0.47821850f) ? 9 : 10; break;
      case 9: return 0.09314830f;
      case 10: return 0.02553787f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree84(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.76490778f) ? 1 : 16; break;
      case 1: node = (f[20] < -1.10162997f) ? 2 : 9; break;
      case 2: node = (f[15] < 0.31998753f) ? 3 : 6; break;
      case 3: node = (f[10] < 0.06481680f) ? 4 : 5; break;
      case 4: return 0.07025378f;
      case 5: return 0.00372158f;
      case 6: node = (f[10] < 0.53343821f) ? 7 : 8; break;
      case 7: return -0.01470709f;
      case 8: return 0.01140887f;
      case 9: node = (f[4] < -0.09992876f) ? 10 : 13; break;
      case 10: node = (f[1] < 0.11983693f) ? 11 : 12; break;
      case 11: return 0.01771908f;
      case 12: return -0.02839304f;
      case 13: node = (f[1] < 0.09762489f) ? 14 : 15; break;
      case 14: return -0.07363113f;
      case 15: return -0.00755519f;
      case 16: node = (f[10] < 0.85331458f) ? 17 : 24; break;
      case 17: node = (f[19] < -0.70067513f) ? 18 : 21; break;
      case 18: node = (f[1] < 0.33561444f) ? 19 : 20; break;
      case 19: return 0.11299523f;
      case 20: return -0.01673265f;
      case 21: node = (f[20] < 0.47524613f) ? 22 : 23; break;
      case 22: return 0.01076878f;
      case 23: return -0.00885589f;
      case 24: node = (f[15] < 0.96808863f) ? 25 : 28; break;
      case 25: node = (f[10] < 1.02394855f) ? 26 : 27; break;
      case 26: return -0.02551061f;
      case 27: return 0.00225577f;
      case 28: return -0.10417694f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree85(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.65959769f) ? 1 : 16; break;
      case 1: node = (f[6] < 1.13036156f) ? 2 : 9; break;
      case 2: node = (f[3] < 2.47882318f) ? 3 : 6; break;
      case 3: node = (f[14] < -3.15854955f) ? 4 : 5; break;
      case 4: return -0.09522337f;
      case 5: return 0.00916647f;
      case 6: node = (f[7] < 1.22470582f) ? 7 : 8; break;
      case 7: return 0.11084390f;
      case 8: return 0.03104602f;
      case 9: node = (f[14] < -0.31619501f) ? 10 : 13; break;
      case 10: node = (f[12] < 0.12953317f) ? 11 : 12; break;
      case 11: return -0.01637468f;
      case 12: return -0.09071217f;
      case 13: node = (f[11] < 0.71634465f) ? 14 : 15; break;
      case 14: return -0.01538738f;
      case 15: return 0.04630195f;
      case 16: node = (f[7] < -1.11175275f) ? 17 : 22; break;
      case 17: node = (f[15] < -2.59448695f) ? 18 : 19; break;
      case 18: return 0.00000000f;
      case 19: node = (f[12] < 1.16635466f) ? 20 : 21; break;
      case 20: return -0.10567867f;
      case 21: return -0.02928229f;
      case 22: node = (f[1] < 1.07075989f) ? 23 : 26; break;
      case 23: node = (f[15] < 0.95250386f) ? 24 : 25; break;
      case 24: return -0.00192621f;
      case 25: return -0.07327902f;
      case 26: node = (f[7] < 0.19292721f) ? 27 : 28; break;
      case 27: return -0.01928603f;
      case 28: return -0.06422555f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree86(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.12263391f;
      case 2: node = (f[11] < 3.17500758f) ? 3 : 10; break;
      case 3: node = (f[19] < 0.05983945f) ? 4 : 7; break;
      case 4: node = (f[20] < -1.52689457f) ? 5 : 6; break;
      case 5: return 0.03305867f;
      case 6: return -0.00915359f;
      case 7: node = (f[17] < 1.04051661f) ? 8 : 9; break;
      case 8: return 0.01576029f;
      case 9: return -0.03461880f;
      case 10: node = (f[8] < -0.20578772f) ? 11 : 12; break;
      case 11: return -0.00688822f;
      case 12: return -0.12337284f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree87(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < 1.41350591f) ? 1 : 12; break;
      case 1: node = (f[17] < -1.04516220f) ? 2 : 5; break;
      case 2: node = (f[3] < -1.34876788f) ? 3 : 4; break;
      case 3: return -0.11600106f;
      case 4: return 0.00000000f;
      case 5: node = (f[12] < 1.89151812f) ? 6 : 9; break;
      case 6: node = (f[19] < 1.03103709f) ? 7 : 8; break;
      case 7: return -0.00159020f;
      case 8: return 0.02603162f;
      case 9: node = (f[20] < 0.26257500f) ? 10 : 11; break;
      case 10: return 0.06913108f;
      case 11: return -0.00195923f;
      case 12: node = (f[16] < 0.03538331f) ? 13 : 18; break;
      case 13: node = (f[7] < 0.92476630f) ? 14 : 15; break;
      case 14: return 0.05879505f;
      case 15: node = (f[18] < 2.07722521f) ? 16 : 17; break;
      case 16: return -0.03773940f;
      case 17: return 0.00412507f;
      case 18: node = (f[18] < -0.21672294f) ? 19 : 22; break;
      case 19: node = (f[2] < -0.47980318f) ? 20 : 21; break;
      case 20: return -0.02405847f;
      case 21: return -0.06096492f;
      case 22: return -0.11719171f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree88(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < -3.53141475f) ? 1 : 6; break;
      case 1: node = (f[16] < -0.50031459f) ? 2 : 3; break;
      case 2: return 0.13890518f;
      case 3: node = (f[12] < 0.32145575f) ? 4 : 5; break;
      case 4: return 0.06788307f;
      case 5: return -0.02181851f;
      case 6: node = (f[0] < -1.39588416f) ? 7 : 14; break;
      case 7: node = (f[15] < -0.89079636f) ? 8 : 11; break;
      case 8: node = (f[15] < -4.23987818f) ? 9 : 10; break;
      case 9: return -0.04930864f;
      case 10: return 0.02731852f;
      case 11: node = (f[17] < 0.23621768f) ? 12 : 13; break;
      case 12: return -0.01654523f;
      case 13: return -0.09160447f;
      case 14: node = (f[6] < -1.41793764f) ? 15 : 18; break;
      case 15: node = (f[9] < -1.34751225f) ? 16 : 17; break;
      case 16: return -0.00352693f;
      case 17: return 0.08422555f;
      case 18: node = (f[10] < 0.72732907f) ? 19 : 20; break;
      case 19: return 0.00300867f;
      case 20: return -0.01699298f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree89(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 1.26129675f) ? 1 : 14; break;
      case 1: node = (f[12] < 1.21698403f) ? 2 : 9; break;
      case 2: node = (f[14] < -0.48640490f) ? 3 : 6; break;
      case 3: node = (f[8] < -0.25428945f) ? 4 : 5; break;
      case 4: return -0.05444382f;
      case 5: return -0.00246219f;
      case 6: node = (f[20] < 1.37085974f) ? 7 : 8; break;
      case 7: return 0.00379526f;
      case 8: return -0.04076326f;
      case 9: node = (f[20] < 2.07267785f) ? 10 : 13; break;
      case 10: node = (f[20] < 1.52553308f) ? 11 : 12; break;
      case 11: return 0.01690628f;
      case 12: return 0.07275931f;
      case 13: return -0.06862000f;
      case 14: node = (f[14] < -0.10305606f) ? 15 : 16; break;
      case 15: return -0.00124368f;
      case 16: node = (f[6] < 1.13505936f) ? 17 : 18; break;
      case 17: return -0.08399520f;
      case 18: return -0.02968835f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree90(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.83542484f) ? 1 : 16; break;
      case 1: node = (f[0] < 0.78266633f) ? 2 : 9; break;
      case 2: node = (f[14] < 0.81577611f) ? 3 : 6; break;
      case 3: node = (f[8] < -0.53794485f) ? 4 : 5; break;
      case 4: return -0.02739105f;
      case 5: return -0.00288636f;
      case 6: node = (f[15] < 0.45875865f) ? 7 : 8; break;
      case 7: return -0.02156937f;
      case 8: return -0.11928283f;
      case 9: node = (f[8] < -0.06956737f) ? 10 : 13; break;
      case 10: node = (f[18] < -0.81627756f) ? 11 : 12; break;
      case 11: return 0.06108725f;
      case 12: return 0.01009769f;
      case 13: node = (f[11] < 0.01824874f) ? 14 : 15; break;
      case 14: return -0.00237008f;
      case 15: return -0.07229505f;
      case 16: node = (f[4] < -0.58372831f) ? 17 : 24; break;
      case 17: node = (f[19] < -0.76490778f) ? 18 : 21; break;
      case 18: node = (f[18] < -0.45133126f) ? 19 : 20; break;
      case 19: return 0.06306250f;
      case 20: return -0.02343898f;
      case 21: node = (f[7] < 0.34794155f) ? 22 : 23; break;
      case 22: return 0.08546267f;
      case 23: return 0.02876574f;
      case 24: node = (f[14] < -3.15854955f) ? 25 : 26; break;
      case 25: return -0.10291028f;
      case 26: node = (f[7] < -0.04431089f) ? 27 : 28; break;
      case 27: return 0.03551425f;
      case 28: return -0.01093382f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree91(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 1.97729218f) ? 1 : 16; break;
      case 1: node = (f[0] < -0.66166353f) ? 2 : 9; break;
      case 2: node = (f[8] < -0.06956737f) ? 3 : 6; break;
      case 3: node = (f[18] < 0.09608816f) ? 4 : 5; break;
      case 4: return -0.00636853f;
      case 5: return -0.05533452f;
      case 6: node = (f[0] < -1.09537673f) ? 7 : 8; break;
      case 7: return 0.01813073f;
      case 8: return -0.04178499f;
      case 9: node = (f[17] < -1.04516220f) ? 10 : 13; break;
      case 10: node = (f[4] < 0.76113707f) ? 11 : 12; break;
      case 11: return -0.10707263f;
      case 12: return -0.00338618f;
      case 13: node = (f[6] < -0.85164899f) ? 14 : 15; break;
      case 14: return 0.03144070f;
      case 15: return 0.00064033f;
      case 16: node = (f[4] < 1.38034356f) ? 17 : 22; break;
      case 17: node = (f[6] < 1.13505936f) ? 18 : 21; break;
      case 18: node = (f[4] < 0.86908084f) ? 19 : 20; break;
      case 19: return 0.05268133f;
      case 20: return -0.05201377f;
      case 21: return -0.06602905f;
      case 22: return 0.15526524f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree92(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.89966226f) ? 1 : 16; break;
      case 1: node = (f[8] < 2.26008081f) ? 2 : 9; break;
      case 2: node = (f[0] < -0.12336925f) ? 3 : 6; break;
      case 3: node = (f[6] < -0.00221589f) ? 4 : 5; break;
      case 4: return 0.00495574f;
      case 5: return -0.02856868f;
      case 6: node = (f[3] < 1.15150285f) ? 7 : 8; break;
      case 7: return 0.00616909f;
      case 8: return 0.05041542f;
      case 9: node = (f[3] < -0.60583663f) ? 10 : 13; break;
      case 10: node = (f[14] < 1.04849672f) ? 11 : 12; break;
      case 11: return 0.01919183f;
      case 12: return 0.00000000f;
      case 13: node = (f[2] < 0.34415704f) ? 14 : 15; break;
      case 14: return -0.06271029f;
      case 15: return -0.01064917f;
      case 16: node = (f[0] < 0.05807947f) ? 17 : 20; break;
      case 17: node = (f[14] < -0.17008562f) ? 18 : 19; break;
      case 18: return -0.02234574f;
      case 19: return -0.08618014f;
      case 20: node = (f[2] < 1.35671735f) ? 21 : 24; break;
      case 21: node = (f[10] < 1.23176873f) ? 22 : 23; break;
      case 22: return 0.00476591f;
      case 23: return -0.04572258f;
      case 24: return -0.05601009f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree93(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.44654807f) ? 1 : 14; break;
      case 1: node = (f[16] < -0.79775751f) ? 2 : 7; break;
      case 2: node = (f[17] < 0.36919230f) ? 3 : 4; break;
      case 3: return 0.13058926f;
      case 4: node = (f[15] < -4.23987818f) ? 5 : 6; break;
      case 5: return -0.04602245f;
      case 6: return 0.00933881f;
      case 7: node = (f[15] < -0.66246825f) ? 8 : 11; break;
      case 8: node = (f[19] < 0.30135423f) ? 9 : 10; break;
      case 9: return -0.09625358f;
      case 10: return -0.02039368f;
      case 11: node = (f[2] < -0.71843398f) ? 12 : 13; break;
      case 12: return -0.04336825f;
      case 13: return -0.00322415f;
      case 14: node = (f[2] < -2.14421368f) ? 15 : 18; break;
      case 15: node = (f[20] < 0.16494265f) ? 16 : 17; break;
      case 16: return 0.10972150f;
      case 17: return 0.00000000f;
      case 18: node = (f[19] < 0.05983945f) ? 19 : 22; break;
      case 19: node = (f[17] < -0.24002477f) ? 20 : 21; break;
      case 20: return -0.01331070f;
      case 21: return 0.00399716f;
      case 22: node = (f[3] < -0.35742965f) ? 23 : 24; break;
      case 23: return -0.00618568f;
      case 24: return 0.03335804f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree94(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 1.24309039f) ? 1 : 16; break;
      case 1: node = (f[16] < 0.91590625f) ? 2 : 9; break;
      case 2: node = (f[5] < -1.61399472f) ? 3 : 6; break;
      case 3: node = (f[9] < 0.73726010f) ? 4 : 5; break;
      case 4: return -0.01611914f;
      case 5: return -0.06734452f;
      case 6: node = (f[0] < -1.44532883f) ? 7 : 8; break;
      case 7: return -0.01807819f;
      case 8: return 0.00398346f;
      case 9: node = (f[20] < -0.74280029f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.30007818f) ? 11 : 12; break;
      case 11: return 0.05585974f;
      case 12: return -0.01284212f;
      case 13: node = (f[7] < -1.32043695f) ? 14 : 15; break;
      case 14: return 0.01531273f;
      case 15: return -0.06085061f;
      case 16: node = (f[2] < 0.30903292f) ? 17 : 18; break;
      case 17: return 0.07558561f;
      case 18: node = (f[19] < -0.04807140f) ? 19 : 22; break;
      case 19: node = (f[8] < -0.12210819f) ? 20 : 21; break;
      case 20: return 0.01148987f;
      case 21: return -0.02844539f;
      case 22: node = (f[0] < 1.32873404f) ? 23 : 24; break;
      case 23: return 0.01007053f;
      case 24: return 0.03882631f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree95(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < -3.53141475f) ? 1 : 6; break;
      case 1: node = (f[20] < 1.18995368f) ? 2 : 5; break;
      case 2: node = (f[15] < 0.37039655f) ? 3 : 4; break;
      case 3: return -0.02442949f;
      case 4: return 0.05144226f;
      case 5: return 0.16430576f;
      case 6: node = (f[0] < -0.18671463f) ? 7 : 14; break;
      case 7: node = (f[7] < -1.25262618f) ? 8 : 11; break;
      case 8: node = (f[16] < -0.77430206f) ? 9 : 10; break;
      case 9: return 0.02901512f;
      case 10: return -0.00847328f;
      case 11: node = (f[5] < 0.91759133f) ? 12 : 13; break;
      case 12: return -0.01743211f;
      case 13: return -0.05800350f;
      case 14: node = (f[20] < 1.37085974f) ? 15 : 18; break;
      case 15: node = (f[7] < 0.39352065f) ? 16 : 17; break;
      case 16: return 0.01839231f;
      case 17: return -0.00413127f;
      case 18: node = (f[15] < 0.36500186f) ? 19 : 20; break;
      case 19: return 0.00112378f;
      case 20: return -0.09949085f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree96(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.09317780f;
      case 2: node = (f[6] < 1.34142208f) ? 3 : 10; break;
      case 3: node = (f[3] < 2.30533409f) ? 4 : 7; break;
      case 4: node = (f[8] < -0.62869191f) ? 5 : 6; break;
      case 5: return -0.01810629f;
      case 6: return 0.00122968f;
      case 7: node = (f[17] < 0.28859079f) ? 8 : 9; break;
      case 8: return 0.06600349f;
      case 9: return 0.00345445f;
      case 10: node = (f[15] < 0.04426175f) ? 11 : 14; break;
      case 11: node = (f[18] < 0.12215576f) ? 12 : 13; break;
      case 12: return 0.03098490f;
      case 13: return -0.01191538f;
      case 14: node = (f[12] < -0.98152965f) ? 15 : 16; break;
      case 15: return -0.01140283f;
      case 16: return -0.06758501f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree97(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -3.61609817f) ? 1 : 2; break;
      case 1: return 0.08467730f;
      case 2: node = (f[10] < -3.47297621f) ? 3 : 4; break;
      case 3: return -0.11862732f;
      case 4: node = (f[0] < 1.24309039f) ? 5 : 8; break;
      case 5: node = (f[15] < 0.95250386f) ? 6 : 7; break;
      case 6: return -0.00104648f;
      case 7: return -0.05318062f;
      case 8: node = (f[1] < 0.33561444f) ? 9 : 10; break;
      case 9: return 0.07126130f;
      case 10: return 0.01557550f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree98(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[4] < -0.08988936f) ? 1 : 16; break;
      case 1: node = (f[1] < 0.62183636f) ? 2 : 9; break;
      case 2: node = (f[7] < 0.49245968f) ? 3 : 6; break;
      case 3: node = (f[1] < 0.17941499f) ? 4 : 5; break;
      case 4: return 0.05070673f;
      case 5: return 0.01464231f;
      case 6: node = (f[4] < -0.92490202f) ? 7 : 8; break;
      case 7: return 0.04416116f;
      case 8: return -0.00829005f;
      case 9: node = (f[7] < -0.74522471f) ? 10 : 13; break;
      case 10: node = (f[5] < -0.97312081f) ? 11 : 12; break;
      case 11: return -0.05550494f;
      case 12: return 0.00823278f;
      case 13: node = (f[1] < 0.73265648f) ? 14 : 15; break;
      case 14: return 0.00802543f;
      case 15: return -0.01207661f;
      case 16: node = (f[20] < 0.47524613f) ? 17 : 24; break;
      case 17: node = (f[7] < -0.06114496f) ? 18 : 21; break;
      case 18: node = (f[7] < -0.71492398f) ? 19 : 20; break;
      case 19: return 0.01504834f;
      case 20: return 0.10689187f;
      case 21: node = (f[9] < 1.94565201f) ? 22 : 23; break;
      case 22: return -0.00543120f;
      case 23: return -0.06053500f;
      case 24: node = (f[7] < -1.30689037f) ? 25 : 28; break;
      case 25: node = (f[1] < 0.08718508f) ? 26 : 27; break;
      case 26: return 0.02024008f;
      case 27: return -0.03301358f;
      case 28: node = (f[15] < -0.81846070f) ? 29 : 30; break;
      case 29: return -0.00530161f;
      case 30: return -0.05760510f;
      default: return 0.0f;
    }
  }
}

static inline float soc_tree99(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < 2.53058314f) ? 1 : 16; break;
      case 1: node = (f[4] < -0.08217312f) ? 2 : 9; break;
      case 2: node = (f[5] < -0.90327609f) ? 3 : 6; break;
      case 3: node = (f[20] < 0.86283577f) ? 4 : 5; break;
      case 4: return -0.00214074f;
      case 5: return -0.03337917f;
      case 6: node = (f[11] < 0.71634465f) ? 7 : 8; break;
      case 7: return 0.00938882f;
      case 8: return 0.04920852f;
      case 9: node = (f[9] < 1.94565201f) ? 10 : 13; break;
      case 10: node = (f[13] < 1.93613994f) ? 11 : 12; break;
      case 11: return -0.00699245f;
      case 12: return 0.09242431f;
      case 13: node = (f[13] < 2.17148161f) ? 14 : 15; break;
      case 14: return -0.08502391f;
      case 15: return 0.00000000f;
      case 16: node = (f[4] < 2.29874134f) ? 17 : 18; break;
      case 17: return 0.10475347f;
      case 18: return 0.02292217f;
      default: return 0.0f;
    }
  }
}

static inline float soc_predict(const float raw_features[22]) {
  float scaled[22];
  for (int i = 0; i < 22; i++) {
    scaled[i] = (raw_features[i] - soc_scaler_mean[i]) / soc_scaler_scale[i];
  }
  float sum = SOC_BASE_SCORE;
  sum += soc_tree0(scaled);
  sum += soc_tree1(scaled);
  sum += soc_tree2(scaled);
  sum += soc_tree3(scaled);
  sum += soc_tree4(scaled);
  sum += soc_tree5(scaled);
  sum += soc_tree6(scaled);
  sum += soc_tree7(scaled);
  sum += soc_tree8(scaled);
  sum += soc_tree9(scaled);
  sum += soc_tree10(scaled);
  sum += soc_tree11(scaled);
  sum += soc_tree12(scaled);
  sum += soc_tree13(scaled);
  sum += soc_tree14(scaled);
  sum += soc_tree15(scaled);
  sum += soc_tree16(scaled);
  sum += soc_tree17(scaled);
  sum += soc_tree18(scaled);
  sum += soc_tree19(scaled);
  sum += soc_tree20(scaled);
  sum += soc_tree21(scaled);
  sum += soc_tree22(scaled);
  sum += soc_tree23(scaled);
  sum += soc_tree24(scaled);
  sum += soc_tree25(scaled);
  sum += soc_tree26(scaled);
  sum += soc_tree27(scaled);
  sum += soc_tree28(scaled);
  sum += soc_tree29(scaled);
  sum += soc_tree30(scaled);
  sum += soc_tree31(scaled);
  sum += soc_tree32(scaled);
  sum += soc_tree33(scaled);
  sum += soc_tree34(scaled);
  sum += soc_tree35(scaled);
  sum += soc_tree36(scaled);
  sum += soc_tree37(scaled);
  sum += soc_tree38(scaled);
  sum += soc_tree39(scaled);
  sum += soc_tree40(scaled);
  sum += soc_tree41(scaled);
  sum += soc_tree42(scaled);
  sum += soc_tree43(scaled);
  sum += soc_tree44(scaled);
  sum += soc_tree45(scaled);
  sum += soc_tree46(scaled);
  sum += soc_tree47(scaled);
  sum += soc_tree48(scaled);
  sum += soc_tree49(scaled);
  sum += soc_tree50(scaled);
  sum += soc_tree51(scaled);
  sum += soc_tree52(scaled);
  sum += soc_tree53(scaled);
  sum += soc_tree54(scaled);
  sum += soc_tree55(scaled);
  sum += soc_tree56(scaled);
  sum += soc_tree57(scaled);
  sum += soc_tree58(scaled);
  sum += soc_tree59(scaled);
  sum += soc_tree60(scaled);
  sum += soc_tree61(scaled);
  sum += soc_tree62(scaled);
  sum += soc_tree63(scaled);
  sum += soc_tree64(scaled);
  sum += soc_tree65(scaled);
  sum += soc_tree66(scaled);
  sum += soc_tree67(scaled);
  sum += soc_tree68(scaled);
  sum += soc_tree69(scaled);
  sum += soc_tree70(scaled);
  sum += soc_tree71(scaled);
  sum += soc_tree72(scaled);
  sum += soc_tree73(scaled);
  sum += soc_tree74(scaled);
  sum += soc_tree75(scaled);
  sum += soc_tree76(scaled);
  sum += soc_tree77(scaled);
  sum += soc_tree78(scaled);
  sum += soc_tree79(scaled);
  sum += soc_tree80(scaled);
  sum += soc_tree81(scaled);
  sum += soc_tree82(scaled);
  sum += soc_tree83(scaled);
  sum += soc_tree84(scaled);
  sum += soc_tree85(scaled);
  sum += soc_tree86(scaled);
  sum += soc_tree87(scaled);
  sum += soc_tree88(scaled);
  sum += soc_tree89(scaled);
  sum += soc_tree90(scaled);
  sum += soc_tree91(scaled);
  sum += soc_tree92(scaled);
  sum += soc_tree93(scaled);
  sum += soc_tree94(scaled);
  sum += soc_tree95(scaled);
  sum += soc_tree96(scaled);
  sum += soc_tree97(scaled);
  sum += soc_tree98(scaled);
  sum += soc_tree99(scaled);
  return sum;
}

#endif // MODEL_SOC_H