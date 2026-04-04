// Auto-generated XGBoost model for ESP32
// Model: range
#ifndef MODEL_RANGE_H
#define MODEL_RANGE_H

#define RANGE_N_BASE_FEATURES 24
#define RANGE_N_TREES 100
#define RANGE_BASE_SCORE 0.500000f

static const float range_scaler_mean[24] = {
  69.81630801f, 378.66157934f, -21.17165555f, -7811.53036281f, 17.64817131f, 16.36841847f, 51.67267887f, 11.80665230f, 68.80383914f, 42.44813636f, 61.51248299f, 0.01334031f, 0.60810302f, 0.32438719f, 32.47274226f, 12.07587282f, 33.05160760f, 0.12826894f, 0.67150021f, 1336.96630318f, 0.38325282f, 59.90000000f, 6.16586151f, 1.27975284f
};
static const float range_scaler_scale[24] = {
  11.93391997f, 8.28363042f, 17.71231707f, 6428.57034614f, 6.98364921f, 10.28356654f, 28.06143954f, 6.82601545f, 27.13203401f, 31.22608743f, 27.02092792f, 0.16865989f, 0.25698013f, 1.08442615f, 8.98559661f, 9.64536921f, 14.22629624f, 3.97776554f, 0.99762110f, 1838.29969632f, 0.48617908f, 1.00000000f, 6.56337379f, 4.66223541f
};

static inline float range_tree0(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.16068442f) ? 1 : 16; break;
      case 1: node = (f[11] < -0.37693402f) ? 2 : 9; break;
      case 2: node = (f[19] < -0.21873541f) ? 3 : 6; break;
      case 3: node = (f[15] < -0.24109688f) ? 4 : 5; break;
      case 4: return -9.30692577f;
      case 5: return -2.31526542f;
      case 6: node = (f[6] < -0.77829146f) ? 7 : 8; break;
      case 7: return -0.99570334f;
      case 8: return -5.86587954f;
      case 9: node = (f[9] < -0.58951145f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.65101302f) ? 11 : 12; break;
      case 11: return 5.42413998f;
      case 12: return -1.93819451f;
      case 13: node = (f[19] < -0.30761197f) ? 14 : 15; break;
      case 14: return -4.55616426f;
      case 15: return -1.85727727f;
      case 16: node = (f[15] < 1.11268306f) ? 17 : 24; break;
      case 17: node = (f[9] < -0.42994937f) ? 18 : 21; break;
      case 18: node = (f[3] < 0.28853300f) ? 19 : 20; break;
      case 19: return 9.78928757f;
      case 20: return 5.31819391f;
      case 21: node = (f[15] < 0.76245850f) ? 22 : 23; break;
      case 22: return 0.43723491f;
      case 23: return 5.44054604f;
      case 24: node = (f[15] < 1.39202058f) ? 25 : 28; break;
      case 25: node = (f[12] < 0.75703764f) ? 26 : 27; break;
      case 26: return 7.97628689f;
      case 27: return 11.94560530f;
      case 28: return 14.70560170f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree1(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.16068442f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.42772058f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.66895813f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.06996521f) ? 4 : 5; break;
      case 4: return -5.23064566f;
      case 5: return 0.30593461f;
      case 6: node = (f[19] < 2.55331969f) ? 7 : 8; break;
      case 7: return -7.75577354f;
      case 8: return 0.04373286f;
      case 9: node = (f[6] < -0.45696795f) ? 10 : 13; break;
      case 10: node = (f[19] < -0.18299499f) ? 11 : 12; break;
      case 11: return -1.07997668f;
      case 12: return 4.09099913f;
      case 13: node = (f[8] < -0.44205454f) ? 14 : 15; break;
      case 14: return -0.97621727f;
      case 15: return -3.54461789f;
      case 16: node = (f[15] < 1.06825125f) ? 17 : 24; break;
      case 17: node = (f[6] < -0.76379353f) ? 18 : 21; break;
      case 18: node = (f[15] < 0.38455281f) ? 19 : 20; break;
      case 19: return 6.32304430f;
      case 20: return 10.61922260f;
      case 21: node = (f[4] < -0.00666862f) ? 22 : 23; break;
      case 22: return 4.34783268f;
      case 23: return 0.38708487f;
      case 24: node = (f[15] < 1.89964676f) ? 25 : 28; break;
      case 25: node = (f[6] < 0.38052827f) ? 26 : 27; break;
      case 26: return 12.12974930f;
      case 27: return 8.17550182f;
      case 28: return 15.45574760f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree2(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.42015293f) ? 1 : 16; break;
      case 1: node = (f[9] < -0.32979271f) ? 2 : 9; break;
      case 2: node = (f[3] < -0.00751522f) ? 3 : 6; break;
      case 3: node = (f[14] < 0.50908780f) ? 4 : 5; break;
      case 4: return 12.76093100f;
      case 5: return 7.48810959f;
      case 6: node = (f[6] < -0.95204073f) ? 7 : 8; break;
      case 7: return 12.58851530f;
      case 8: return 3.91306329f;
      case 9: node = (f[3] < -0.83519745f) ? 10 : 13; break;
      case 10: node = (f[2] < -2.11798811f) ? 11 : 12; break;
      case 11: return 11.43120670f;
      case 12: return 4.43016911f;
      case 13: node = (f[9] < 0.40934128f) ? 14 : 15; break;
      case 14: return 1.03092098f;
      case 15: return -3.16598463f;
      case 16: node = (f[6] < -0.96219510f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.67252195f) ? 18 : 21; break;
      case 18: node = (f[6] < -1.19196236f) ? 19 : 20; break;
      case 19: return 11.94825650f;
      case 20: return 3.62537122f;
      case 21: node = (f[3] < 0.81164479f) ? 22 : 23; break;
      case 22: return -0.25097519f;
      case 23: return -4.98228979f;
      case 24: node = (f[3] < 0.71588194f) ? 25 : 28; break;
      case 25: node = (f[9] < -0.23773420f) ? 26 : 27; break;
      case 26: return -2.17699313f;
      case 27: return -7.31048441f;
      case 28: node = (f[3] < 0.81774128f) ? 29 : 30; break;
      case 29: return -6.76849794f;
      case 30: return -9.38027859f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree3(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.50428975f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.46513403f) ? 2 : 9; break;
      case 2: node = (f[9] < -0.51552630f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.74559569f) ? 4 : 5; break;
      case 4: return 1.28265357f;
      case 5: return -5.31791067f;
      case 6: node = (f[19] < 2.55331969f) ? 7 : 8; break;
      case 7: return -7.10162020f;
      case 8: return 1.32567513f;
      case 9: node = (f[9] < -0.61993474f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.66219902f) ? 11 : 12; break;
      case 11: return 5.28389072f;
      case 12: return -0.62312144f;
      case 13: node = (f[12] < -0.90407538f) ? 14 : 15; break;
      case 14: return -3.48926258f;
      case 15: return -0.64271468f;
      case 16: node = (f[15] < 1.12984896f) ? 17 : 24; break;
      case 17: node = (f[9] < -0.35948431f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.14235055f) ? 19 : 20; break;
      case 19: return 5.29172850f;
      case 20: return 10.17790890f;
      case 21: node = (f[4] < 1.22896039f) ? 22 : 23; break;
      case 22: return 3.56177473f;
      case 23: return -2.48711801f;
      case 24: node = (f[15] < 1.48298907f) ? 25 : 28; break;
      case 25: node = (f[9] < -0.08638983f) ? 26 : 27; break;
      case 26: return 9.81974792f;
      case 27: return 6.20459509f;
      case 28: node = (f[0] < 0.67737108f) ? 29 : 30; break;
      case 29: return 12.69234470f;
      case 30: return 8.82888031f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree4(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 0.21123192f) ? 1 : 16; break;
      case 1: node = (f[11] < -0.60231841f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.23273338f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.59029013f) ? 4 : 5; break;
      case 4: return -4.61366892f;
      case 5: return -7.33640623f;
      case 6: node = (f[8] < -0.82020533f) ? 7 : 8; break;
      case 7: return 1.68258500f;
      case 8: return -3.96844959f;
      case 9: node = (f[19] < -0.20240538f) ? 10 : 13; break;
      case 10: node = (f[2] < -0.34442949f) ? 11 : 12; break;
      case 11: return 0.66922283f;
      case 12: return -3.60930467f;
      case 13: node = (f[7] < -0.85902280f) ? 14 : 15; break;
      case 14: return -2.36607623f;
      case 15: return 1.53056765f;
      case 16: node = (f[11] < 1.03270769f) ? 17 : 24; break;
      case 17: node = (f[4] < -0.09281269f) ? 18 : 21; break;
      case 18: node = (f[7] < 0.13763097f) ? 19 : 20; break;
      case 19: return 3.97975945f;
      case 20: return 7.89043856f;
      case 21: node = (f[16] < -1.07105350f) ? 22 : 23; break;
      case 22: return -1.58883691f;
      case 23: return 2.26179385f;
      case 24: node = (f[19] < 2.46209431f) ? 25 : 28; break;
      case 25: node = (f[2] < -0.59117871f) ? 26 : 27; break;
      case 26: return 11.97615240f;
      case 27: return 7.60148764f;
      case 28: return -0.02866211f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree5(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.17446996f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.46513403f) ? 2 : 9; break;
      case 2: node = (f[19] < -0.17400117f) ? 3 : 6; break;
      case 3: node = (f[6] < -1.14590979f) ? 4 : 5; break;
      case 4: return -1.68599641f;
      case 5: return -6.32420206f;
      case 6: node = (f[3] < 0.76618397f) ? 7 : 8; break;
      case 7: return -1.30985045f;
      case 8: return -5.23466158f;
      case 9: node = (f[6] < -0.45124599f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.61248934f) ? 11 : 12; break;
      case 11: return 2.87941432f;
      case 12: return -1.11162460f;
      case 13: node = (f[15] < -0.29596305f) ? 14 : 15; break;
      case 14: return -4.25685453f;
      case 15: return -2.20661330f;
      case 16: node = (f[15] < 1.06825125f) ? 17 : 24; break;
      case 17: node = (f[9] < -1.00174689f) ? 18 : 21; break;
      case 18: node = (f[3] < 0.36977571f) ? 19 : 20; break;
      case 19: return 9.88998413f;
      case 20: return 4.57339382f;
      case 21: node = (f[19] < 2.46209431f) ? 22 : 23; break;
      case 22: return 2.13765097f;
      case 23: return -4.92184401f;
      case 24: node = (f[15] < 1.48298907f) ? 25 : 28; break;
      case 25: node = (f[9] < -0.11907148f) ? 26 : 27; break;
      case 26: return 8.12337112f;
      case 27: return 5.41987371f;
      case 28: node = (f[8] < -0.41514909f) ? 29 : 30; break;
      case 29: return 6.22770262f;
      case 30: return 10.73925300f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree6(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 0.00410897f) ? 1 : 16; break;
      case 1: node = (f[11] < -0.59101260f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.14792675f) ? 3 : 6; break;
      case 3: node = (f[14] < 0.84183007f) ? 4 : 5; break;
      case 4: return -5.54874849f;
      case 5: return -0.74820435f;
      case 6: node = (f[6] < -0.96219510f) ? 7 : 8; break;
      case 7: return 2.83624911f;
      case 8: return -3.61547422f;
      case 9: node = (f[5] < -1.24533665f) ? 10 : 13; break;
      case 10: node = (f[19] < 0.29636103f) ? 11 : 12; break;
      case 11: return 0.78387231f;
      case 12: return 5.67709208f;
      case 13: node = (f[12] < -0.05855427f) ? 14 : 15; break;
      case 14: return -3.48877287f;
      case 15: return -1.16747141f;
      case 16: node = (f[11] < 0.91452104f) ? 17 : 24; break;
      case 17: node = (f[5] < -0.08269522f) ? 18 : 21; break;
      case 18: node = (f[7] < 0.72782928f) ? 19 : 20; break;
      case 19: return 3.60550094f;
      case 20: return 8.14381123f;
      case 21: node = (f[12] < -1.09828579f) ? 22 : 23; break;
      case 22: return -2.25640631f;
      case 23: return 1.35070193f;
      case 24: node = (f[19] < 2.46209431f) ? 25 : 28; break;
      case 25: node = (f[11] < 1.62532043f) ? 26 : 27; break;
      case 26: return 6.67863989f;
      case 27: return 10.69604300f;
      case 28: return -0.42383605f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree7(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.29204324f) ? 1 : 16; break;
      case 1: node = (f[11] < -0.39314020f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.43766561f) ? 3 : 6; break;
      case 3: node = (f[6] < -0.28526735f) ? 4 : 5; break;
      case 4: return 4.65956736f;
      case 5: return -2.97384596f;
      case 6: node = (f[6] < -1.13123429f) ? 7 : 8; break;
      case 7: return -1.03885400f;
      case 8: return -5.35057497f;
      case 9: node = (f[16] < -0.32534459f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.09522031f) ? 11 : 12; break;
      case 11: return -1.32758057f;
      case 12: return -3.14541936f;
      case 13: node = (f[19] < -0.13006565f) ? 14 : 15; break;
      case 14: return -1.02467644f;
      case 15: return 3.30074358f;
      case 16: node = (f[15] < 1.12984896f) ? 17 : 24; break;
      case 17: node = (f[19] < 2.37643528f) ? 18 : 21; break;
      case 18: node = (f[6] < -0.76379353f) ? 19 : 20; break;
      case 19: return 6.35832930f;
      case 20: return 2.16628313f;
      case 21: node = (f[15] < 0.59206587f) ? 22 : 23; break;
      case 22: return -7.19217491f;
      case 23: return -1.46304572f;
      case 24: node = (f[15] < 1.94923878f) ? 25 : 28; break;
      case 25: node = (f[6] < -0.19650675f) ? 26 : 27; break;
      case 26: return 8.91656876f;
      case 27: return 5.41169119f;
      case 28: node = (f[8] < 0.05108945f) ? 29 : 30; break;
      case 29: return 5.06434441f;
      case 30: return 11.08403020f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree8(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.59933042f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.41830847f) ? 2 : 9; break;
      case 2: node = (f[9] < -0.52770418f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.59209478f) ? 4 : 5; break;
      case 4: return 5.09504175f;
      case 5: return -3.17238545f;
      case 6: node = (f[19] < 0.29636103f) ? 7 : 8; break;
      case 7: return -5.18716955f;
      case 8: return -2.14428997f;
      case 9: node = (f[9] < -1.27931929f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.61248934f) ? 11 : 12; break;
      case 11: return 8.04098988f;
      case 12: return -0.68971390f;
      case 13: node = (f[9] < -0.24228576f) ? 14 : 15; break;
      case 14: return 0.98571914f;
      case 15: return -1.46450377f;
      case 16: node = (f[15] < 1.33135843f) ? 17 : 24; break;
      case 17: node = (f[9] < -0.44876376f) ? 18 : 21; break;
      case 18: node = (f[3] < 0.21302328f) ? 19 : 20; break;
      case 19: return 7.00412321f;
      case 20: return 2.73078322f;
      case 21: node = (f[15] < 0.73578453f) ? 22 : 23; break;
      case 22: return 1.10617173f;
      case 23: return 3.56115103f;
      case 24: node = (f[0] < 0.67737108f) ? 25 : 28; break;
      case 25: node = (f[19] < -0.48561159f) ? 26 : 27; break;
      case 26: return 5.22921371f;
      case 27: return 9.30184364f;
      case 28: node = (f[0] < 0.86171955f) ? 29 : 30; break;
      case 29: return 1.88503551f;
      case 30: return 8.41800785f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree9(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 0.18592340f) ? 1 : 16; break;
      case 1: node = (f[3] < 0.50738370f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.39918551f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.08026422f) ? 4 : 5; break;
      case 4: return 9.91869736f;
      case 5: return 2.56010389f;
      case 6: node = (f[2] < -1.44667566f) ? 7 : 8; break;
      case 7: return 2.81870079f;
      case 8: return -1.83681655f;
      case 9: node = (f[6] < -0.95204073f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.76618397f) ? 11 : 12; break;
      case 11: return 3.05538297f;
      case 12: return -2.74512911f;
      case 13: node = (f[3] < 0.82538658f) ? 14 : 15; break;
      case 14: return -3.77715230f;
      case 15: return -6.20659351f;
      case 16: node = (f[11] < 0.95582706f) ? 17 : 24; break;
      case 17: node = (f[4] < -0.44891593f) ? 18 : 21; break;
      case 18: node = (f[9] < -1.06851804f) ? 19 : 20; break;
      case 19: return 7.85251379f;
      case 20: return 3.44195485f;
      case 21: node = (f[22] < 1.11743426f) ? 22 : 23; break;
      case 22: return 0.58202469f;
      case 23: return 4.30233431f;
      case 24: node = (f[2] < -0.50793248f) ? 25 : 28; break;
      case 25: node = (f[12] < 0.13407342f) ? 26 : 27; break;
      case 26: return 5.71446037f;
      case 27: return 9.17875576f;
      case 28: node = (f[6] < -0.63267767f) ? 29 : 30; break;
      case 29: return 6.41149759f;
      case 30: return 1.72178793f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree10(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.32447481f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.51051158f) ? 2 : 9; break;
      case 2: node = (f[4] < -1.23031712f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.47999990f) ? 4 : 5; break;
      case 4: return -1.32522154f;
      case 5: return 5.39430714f;
      case 6: node = (f[11] < -0.69038534f) ? 7 : 8; break;
      case 7: return -4.65305948f;
      case 8: return -2.54286289f;
      case 9: node = (f[6] < -0.45696795f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.36348724f) ? 11 : 12; break;
      case 11: return 4.99638653f;
      case 12: return 0.12425203f;
      case 13: node = (f[5] < -0.81936896f) ? 14 : 15; break;
      case 14: return -0.59105575f;
      case 15: return -2.37352133f;
      case 16: node = (f[15] < 0.96107542f) ? 17 : 22; break;
      case 17: node = (f[19] < 2.30029607f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.34930810f) ? 19 : 20; break;
      case 19: return 0.63450605f;
      case 20: return 3.51223874f;
      case 21: return -4.14339209f;
      case 22: node = (f[15] < 1.33135843f) ? 23 : 26; break;
      case 23: node = (f[9] < -0.45545256f) ? 24 : 25; break;
      case 24: return 6.42275333f;
      case 25: return 3.34251237f;
      case 26: node = (f[0] < 0.51816100f) ? 27 : 28; break;
      case 27: return 7.57252836f;
      case 28: return 4.64156532f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree11(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.35847363f) ? 1 : 16; break;
      case 1: node = (f[3] < 0.76618397f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.74606216f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.38211295f) ? 4 : 5; break;
      case 4: return 7.15868330f;
      case 5: return 1.35269117f;
      case 6: node = (f[2] < 0.23530173f) ? 7 : 8; break;
      case 7: return -0.69664282f;
      case 8: return -2.79449129f;
      case 9: node = (f[6] < -1.15237379f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.89751697f) ? 11 : 12; break;
      case 11: return 0.75665975f;
      case 12: return -2.76011372f;
      case 13: node = (f[3] < 0.82538658f) ? 14 : 15; break;
      case 14: return -3.18643856f;
      case 15: return -5.05665684f;
      case 16: node = (f[15] < 1.39202058f) ? 17 : 24; break;
      case 17: node = (f[6] < -0.69244176f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.35759473f) ? 19 : 20; break;
      case 19: return 2.51543760f;
      case 20: return 7.14947701f;
      case 21: node = (f[19] < 2.30029607f) ? 22 : 23; break;
      case 22: return 1.94763076f;
      case 23: return -4.64466286f;
      case 24: node = (f[15] < 1.77670467f) ? 25 : 28; break;
      case 25: node = (f[17] < 0.07334044f) ? 26 : 27; break;
      case 26: return 3.49421835f;
      case 27: return 5.96246004f;
      case 28: node = (f[7] < -0.50945628f) ? 29 : 30; break;
      case 29: return 4.48008585f;
      case 30: return 8.30295467f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree12(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.06708682f) ? 1 : 16; break;
      case 1: node = (f[3] < 0.81164479f) ? 2 : 9; break;
      case 2: node = (f[9] < -0.60408258f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.50738370f) ? 4 : 5; break;
      case 4: return 4.35412455f;
      case 5: return -0.02790377f;
      case 6: node = (f[19] < 2.55331969f) ? 7 : 8; break;
      case 7: return -2.41839361f;
      case 8: return 5.12647820f;
      case 9: node = (f[6] < -1.15237379f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.89250702f) ? 11 : 12; break;
      case 11: return -0.00574521f;
      case 12: return -2.41648579f;
      case 13: node = (f[3] < 0.93675280f) ? 14 : 15; break;
      case 14: return -3.75617027f;
      case 15: return -5.16910934f;
      case 16: node = (f[15] < 1.27820683f) ? 17 : 24; break;
      case 17: node = (f[9] < -1.24607146f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.30761197f) ? 19 : 20; break;
      case 19: return 2.81142306f;
      case 20: return 7.93394518f;
      case 21: node = (f[4] < -0.00666862f) ? 22 : 23; break;
      case 22: return 2.64470792f;
      case 23: return 0.25963798f;
      case 24: node = (f[7] < 1.62913096f) ? 25 : 28; break;
      case 25: node = (f[23] < 1.05596638f) ? 26 : 27; break;
      case 26: return 5.71836662f;
      case 27: return 2.91636992f;
      case 28: return 8.48380184f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree13(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.62445271f) ? 1 : 16; break;
      case 1: node = (f[6] < -1.05906701f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.75922149f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.66672373f) ? 4 : 5; break;
      case 4: return 6.99519634f;
      case 5: return 2.79580784f;
      case 6: node = (f[2] < 0.80818367f) ? 7 : 8; break;
      case 7: return 0.50381118f;
      case 8: return -2.06028628f;
      case 9: node = (f[2] < 0.60347187f) ? 10 : 13; break;
      case 10: node = (f[6] < 0.11715262f) ? 11 : 12; break;
      case 11: return 0.62905443f;
      case 12: return -1.86605644f;
      case 13: node = (f[8] < -0.02778410f) ? 14 : 15; break;
      case 14: return -2.96852255f;
      case 15: return -5.26129913f;
      case 16: node = (f[15] < 1.39202058f) ? 17 : 22; break;
      case 17: node = (f[5] < 1.39266837f) ? 18 : 21; break;
      case 18: node = (f[6] < -0.45696795f) ? 19 : 20; break;
      case 19: return 4.86241531f;
      case 20: return 2.27597260f;
      case 21: return -1.91125679f;
      case 22: node = (f[8] < -0.38898075f) ? 23 : 24; break;
      case 23: return 1.80039084f;
      case 24: node = (f[15] < 1.77670467f) ? 25 : 26; break;
      case 25: return 4.13195229f;
      case 26: return 6.83044720f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree14(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.17446996f) ? 1 : 16; break;
      case 1: node = (f[6] < -0.88464618f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.69443315f) ? 3 : 6; break;
      case 3: node = (f[6] < -1.13123429f) ? 4 : 5; break;
      case 4: return 7.83561611f;
      case 5: return 2.57108426f;
      case 6: node = (f[3] < 0.85962826f) ? 7 : 8; break;
      case 7: return -0.42389721f;
      case 8: return -2.77027559f;
      case 9: node = (f[3] < 0.60950232f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.74099910f) ? 11 : 12; break;
      case 11: return 1.80749130f;
      case 12: return -1.58025825f;
      case 13: node = (f[19] < 0.78760225f) ? 14 : 15; break;
      case 14: return -3.84527731f;
      case 15: return -0.83195710f;
      case 16: node = (f[15] < 1.06825125f) ? 17 : 24; break;
      case 17: node = (f[9] < -1.12512136f) ? 18 : 21; break;
      case 18: node = (f[19] < -0.50498641f) ? 19 : 20; break;
      case 19: return 0.99650914f;
      case 20: return 6.11122894f;
      case 21: node = (f[19] < 2.48901558f) ? 22 : 23; break;
      case 22: return 1.11362410f;
      case 23: return -3.33931756f;
      case 24: node = (f[7] < 1.74439776f) ? 25 : 28; break;
      case 25: node = (f[15] < 1.77670467f) ? 26 : 27; break;
      case 26: return 3.53216839f;
      case 27: return 5.79126072f;
      case 28: return 7.23190355f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree15(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < -0.02682113f) ? 1 : 16; break;
      case 1: node = (f[3] < 0.81164479f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.45124599f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.13058701f) ? 4 : 5; break;
      case 4: return 7.12775326f;
      case 5: return 0.26486123f;
      case 6: node = (f[2] < 0.17363788f) ? 7 : 8; break;
      case 7: return -0.44745803f;
      case 8: return -2.83378053f;
      case 9: node = (f[6] < -1.11572599f) ? 10 : 13; break;
      case 10: node = (f[11] < -0.43494031f) ? 11 : 12; break;
      case 11: return -1.13327479f;
      case 12: return -3.01892591f;
      case 13: node = (f[19] < 0.29636103f) ? 14 : 15; break;
      case 14: return -4.12324190f;
      case 15: return -1.94317973f;
      case 16: node = (f[11] < 0.91452104f) ? 17 : 24; break;
      case 17: node = (f[19] < -0.25149673f) ? 18 : 21; break;
      case 18: node = (f[3] < -0.71509230f) ? 19 : 20; break;
      case 19: return 2.39750314f;
      case 20: return -0.63929254f;
      case 21: node = (f[16] < -1.12342942f) ? 22 : 23; break;
      case 22: return -1.65765440f;
      case 23: return 2.54267430f;
      case 24: node = (f[19] < 2.46209431f) ? 25 : 28; break;
      case 25: node = (f[19] < 0.01321893f) ? 26 : 27; break;
      case 26: return 3.27904940f;
      case 27: return 5.98863983f;
      case 28: return -3.31609058f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree16(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.68205208f) ? 1 : 16; break;
      case 1: node = (f[10] < -0.62359011f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.38970748f) ? 3 : 6; break;
      case 3: node = (f[18] < -0.66809946f) ? 4 : 5; break;
      case 4: return 9.46526718f;
      case 5: return 3.77367640f;
      case 6: node = (f[6] < -1.14590979f) ? 7 : 8; break;
      case 7: return 1.79550529f;
      case 8: return -1.18552709f;
      case 9: node = (f[2] < 0.43766561f) ? 10 : 13; break;
      case 10: node = (f[6] < 0.23377825f) ? 11 : 12; break;
      case 11: return 0.67336529f;
      case 12: return -1.41445613f;
      case 13: node = (f[19] < 2.53081703f) ? 14 : 15; break;
      case 14: return -3.11426044f;
      case 15: return 1.04471004f;
      case 16: node = (f[7] < 1.74439776f) ? 17 : 24; break;
      case 17: node = (f[15] < 0.96107542f) ? 18 : 21; break;
      case 18: node = (f[23] < 0.40388289f) ? 19 : 20; break;
      case 19: return 0.60890657f;
      case 20: return 3.30158567f;
      case 21: node = (f[6] < -0.79929119f) ? 22 : 23; break;
      case 22: return 6.02455425f;
      case 23: return 2.94445539f;
      case 24: node = (f[16] < 1.18315101f) ? 25 : 26; break;
      case 25: return 4.04064894f;
      case 26: return 7.47748804f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree17(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.73578453f) ? 1 : 16; break;
      case 1: node = (f[9] < -1.04369903f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.85161012f) ? 3 : 6; break;
      case 3: node = (f[6] < -1.19196236f) ? 4 : 5; break;
      case 4: return 5.25468016f;
      case 5: return 1.48315990f;
      case 6: node = (f[8] < -1.15228510f) ? 7 : 8; break;
      case 7: return 0.02379162f;
      case 8: return -2.99551392f;
      case 9: node = (f[2] < 0.41064644f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.55067599f) ? 11 : 12; break;
      case 11: return 3.22141623f;
      case 12: return -0.83851355f;
      case 13: node = (f[8] < 0.02418399f) ? 14 : 15; break;
      case 14: return -1.78515494f;
      case 15: return -3.93946314f;
      case 16: node = (f[2] < 0.14726789f) ? 17 : 22; break;
      case 17: node = (f[19] < 2.50740790f) ? 18 : 21; break;
      case 18: node = (f[9] < -0.45545256f) ? 19 : 20; break;
      case 19: return 6.30619240f;
      case 20: return 2.90765285f;
      case 21: return -1.84463573f;
      case 22: return -1.03041625f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree18(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.90548223f) ? 1 : 16; break;
      case 1: node = (f[15] < -0.29596305f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.15857065f) ? 3 : 6; break;
      case 3: node = (f[6] < 0.11715262f) ? 4 : 5; break;
      case 4: return -1.42319894f;
      case 5: return -3.41911149f;
      case 6: node = (f[18] < -0.44249564f) ? 7 : 8; break;
      case 7: return 3.27594543f;
      case 8: return -0.55660033f;
      case 9: node = (f[9] < -1.17523968f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.65609956f) ? 11 : 12; break;
      case 11: return 4.31243134f;
      case 12: return -0.15524757f;
      case 13: node = (f[5] < -0.06383179f) ? 14 : 15; break;
      case 14: return 1.13966572f;
      case 15: return -0.64168423f;
      case 16: node = (f[19] < 0.14792675f) ? 17 : 22; break;
      case 17: node = (f[15] < 2.35428452f) ? 18 : 21; break;
      case 18: node = (f[9] < -0.76252383f) ? 19 : 20; break;
      case 19: return 5.82212591f;
      case 20: return 1.68664169f;
      case 21: return 6.24127960f;
      case 22: node = (f[12] < -0.43059579f) ? 23 : 26; break;
      case 23: node = (f[5] < -1.24533665f) ? 24 : 25; break;
      case 24: return 3.79377961f;
      case 25: return 2.00501347f;
      case 26: return 6.56415653f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree19(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.41064644f) ? 1 : 14; break;
      case 1: node = (f[9] < -0.72953862f) ? 2 : 7; break;
      case 2: node = (f[6] < -0.93161988f) ? 3 : 4; break;
      case 3: return 6.17976046f;
      case 4: node = (f[2] < 0.18912672f) ? 5 : 6; break;
      case 5: return 4.99913788f;
      case 6: return 0.56739223f;
      case 7: node = (f[2] < -0.60381961f) ? 8 : 11; break;
      case 8: node = (f[19] < 2.46209431f) ? 9 : 10; break;
      case 9: return 2.48449278f;
      case 10: return -3.17514920f;
      case 11: node = (f[10] < -0.55067599f) ? 12 : 13; break;
      case 12: return 2.43736053f;
      case 13: return -0.72070098f;
      case 14: node = (f[6] < -1.14590979f) ? 15 : 22; break;
      case 15: node = (f[2] < 0.66672373f) ? 16 : 19; break;
      case 16: node = (f[6] < -1.25483274f) ? 17 : 18; break;
      case 17: return 9.20353794f;
      case 18: return 2.52122402f;
      case 19: node = (f[2] < 0.89751697f) ? 20 : 21; break;
      case 20: return 1.36724854f;
      case 21: return -1.70328915f;
      case 22: node = (f[9] < -0.16886958f) ? 23 : 26; break;
      case 23: node = (f[2] < 0.80433512f) ? 24 : 25; break;
      case 24: return -0.75515300f;
      case 25: return -2.87227583f;
      case 26: node = (f[19] < 2.49807858f) ? 27 : 28; break;
      case 27: return -3.50396013f;
      case 28: return -0.09282702f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree20(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.50428975f) ? 1 : 16; break;
      case 1: node = (f[9] < -1.04369903f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.66219902f) ? 3 : 6; break;
      case 3: node = (f[10] < -0.62359011f) ? 4 : 5; break;
      case 4: return 4.64919853f;
      case 5: return 0.84966427f;
      case 6: node = (f[2] < 0.85667247f) ? 7 : 8; break;
      case 7: return 0.56602794f;
      case 8: return -1.94090724f;
      case 9: node = (f[2] < 0.60347187f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.56801575f) ? 11 : 12; break;
      case 11: return 1.53294885f;
      case 12: return -1.11810815f;
      case 13: node = (f[10] < -0.29079267f) ? 14 : 15; break;
      case 14: return -1.79029965f;
      case 15: return -3.50539088f;
      case 16: node = (f[15] < 1.39202058f) ? 17 : 24; break;
      case 17: node = (f[5] < -0.01258498f) ? 18 : 21; break;
      case 18: node = (f[1] < 0.46704811f) ? 19 : 20; break;
      case 19: return 1.90960646f;
      case 20: return 5.14831829f;
      case 21: node = (f[5] < 1.39266837f) ? 22 : 23; break;
      case 22: return 0.90190655f;
      case 23: return -1.44813371f;
      case 24: node = (f[7] < 1.39654219f) ? 25 : 28; break;
      case 25: node = (f[23] < 1.05596638f) ? 26 : 27; break;
      case 26: return 3.43736434f;
      case 27: return 0.48418462f;
      case 28: return 4.97565079f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree21(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.56432837f) ? 1 : 16; break;
      case 1: node = (f[3] < 0.61248934f) ? 2 : 9; break;
      case 2: node = (f[10] < -0.60924935f) ? 3 : 6; break;
      case 3: node = (f[3] < -0.00751522f) ? 4 : 5; break;
      case 4: return 8.49216557f;
      case 5: return 1.64921582f;
      case 6: node = (f[9] < 0.66841114f) ? 7 : 8; break;
      case 7: return -0.15298307f;
      case 8: return -1.59299099f;
      case 9: node = (f[10] < -0.81320590f) ? 10 : 13; break;
      case 10: node = (f[3] < 0.85962826f) ? 11 : 12; break;
      case 11: return 0.06987059f;
      case 12: return -1.81835306f;
      case 13: node = (f[8] < -0.02778410f) ? 14 : 15; break;
      case 14: return -1.80979013f;
      case 15: return -3.36138511f;
      case 16: node = (f[19] < 2.46209431f) ? 17 : 22; break;
      case 17: node = (f[15] < 2.42355776f) ? 18 : 21; break;
      case 18: node = (f[19] < 0.24383965f) ? 19 : 20; break;
      case 19: return 1.76459968f;
      case 20: return 4.19048405f;
      case 21: return 6.28814983f;
      case 22: return -2.17760015f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree22(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.06708682f) ? 1 : 16; break;
      case 1: node = (f[6] < -0.95204073f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.72571659f) ? 3 : 6; break;
      case 3: node = (f[14] < -1.67672515f) ? 4 : 5; break;
      case 4: return 7.28962469f;
      case 5: return 2.03708363f;
      case 6: node = (f[2] < 0.85667247f) ? 7 : 8; break;
      case 7: return 0.06673862f;
      case 8: return -1.95122111f;
      case 9: node = (f[3] < 0.05144265f) ? 10 : 13; break;
      case 10: node = (f[6] < 0.11715262f) ? 11 : 12; break;
      case 11: return 6.56808090f;
      case 12: return -0.31465143f;
      case 13: node = (f[9] < 0.66841114f) ? 14 : 15; break;
      case 14: return -1.23884797f;
      case 15: return -3.20603657f;
      case 16: node = (f[15] < 1.06825125f) ? 17 : 22; break;
      case 17: node = (f[6] < -1.19196236f) ? 18 : 19; break;
      case 18: return 4.79866982f;
      case 19: node = (f[5] < -0.91100872f) ? 20 : 21; break;
      case 20: return 1.82957399f;
      case 21: return 0.01510084f;
      case 22: node = (f[8] < -0.70447499f) ? 23 : 24; break;
      case 23: return -0.07385264f;
      case 24: node = (f[15] < 2.42355776f) ? 25 : 26; break;
      case 25: return 2.35139394f;
      case 26: return 5.75270176f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree23(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.50428975f) ? 1 : 16; break;
      case 1: node = (f[6] < -1.14590979f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.66672373f) ? 3 : 6; break;
      case 3: node = (f[22] < 0.30484399f) ? 4 : 5; break;
      case 4: return 3.63583279f;
      case 5: return 7.33013678f;
      case 6: node = (f[3] < 0.89250702f) ? 7 : 8; break;
      case 7: return 1.25303233f;
      case 8: return -1.19555593f;
      case 9: node = (f[3] < 0.53189599f) ? 10 : 13; break;
      case 10: node = (f[6] < -0.71920919f) ? 11 : 12; break;
      case 11: return 2.59068561f;
      case 12: return -0.51319516f;
      case 13: node = (f[10] < 0.16570552f) ? 14 : 15; break;
      case 14: return -1.33393383f;
      case 15: return -3.11779928f;
      case 16: node = (f[19] < 2.46209431f) ? 17 : 24; break;
      case 17: node = (f[19] < -0.33110288f) ? 18 : 21; break;
      case 18: node = (f[1] < 0.72390008f) ? 19 : 20; break;
      case 19: return 1.22482944f;
      case 20: return -0.83394462f;
      case 21: node = (f[6] < -0.39918551f) ? 22 : 23; break;
      case 22: return 4.11152983f;
      case 23: return 1.94762444f;
      case 24: return -2.30394340f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree24(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.11140343f) ? 1 : 16; break;
      case 1: node = (f[6] < -0.44543019f) ? 2 : 9; break;
      case 2: node = (f[11] < 1.19031596f) ? 3 : 6; break;
      case 3: node = (f[3] < -0.21775208f) ? 4 : 5; break;
      case 4: return 8.42432785f;
      case 5: return 3.85435057f;
      case 6: node = (f[4] < -0.64384502f) ? 7 : 8; break;
      case 7: return -0.96608651f;
      case 8: return 3.17230892f;
      case 9: node = (f[2] < -1.35731125f) ? 10 : 13; break;
      case 10: node = (f[4] < 0.05037892f) ? 11 : 12; break;
      case 11: return 3.40165544f;
      case 12: return 1.13752246f;
      case 13: node = (f[6] < 1.52453113f) ? 14 : 15; break;
      case 14: return 0.28177276f;
      case 15: return -2.27441907f;
      case 16: node = (f[6] < -0.99345207f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.71317637f) ? 18 : 21; break;
      case 18: node = (f[10] < -1.18435919f) ? 19 : 20; break;
      case 19: return 5.00604057f;
      case 20: return 1.96000051f;
      case 21: node = (f[11] < -0.11467051f) ? 22 : 23; break;
      case 22: return 0.06815496f;
      case 23: return -1.90495586f;
      case 24: node = (f[19] < 2.55331969f) ? 25 : 28; break;
      case 25: node = (f[6] < -0.01572070f) ? 26 : 27; break;
      case 26: return -0.73726112f;
      case 27: return -2.40054655f;
      case 28: return 4.33515787f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree25(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.09114191f) ? 1 : 10; break;
      case 1: node = (f[19] < 2.56111693f) ? 2 : 9; break;
      case 2: node = (f[9] < -0.74266863f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.78954399f) ? 4 : 5; break;
      case 4: return 1.49202120f;
      case 5: return -1.21096647f;
      case 6: node = (f[3] < 0.48911727f) ? 7 : 8; break;
      case 7: return -0.55585158f;
      case 8: return -1.71740067f;
      case 9: return 4.46378088f;
      case 10: node = (f[19] < 2.46209431f) ? 11 : 18; break;
      case 11: node = (f[15] < 1.94923878f) ? 12 : 15; break;
      case 12: node = (f[19] < -0.12560500f) ? 13 : 14; break;
      case 13: return 0.28981173f;
      case 14: return 1.88915968f;
      case 15: node = (f[18] < 0.82400864f) ? 16 : 17; break;
      case 16: return 3.05306792f;
      case 17: return 5.20839787f;
      case 18: node = (f[7] < -0.81076044f) ? 19 : 20; break;
      case 19: return -5.99622917f;
      case 20: node = (f[19] < 2.52329206f) ? 21 : 22; break;
      case 21: return -3.94130754f;
      case 22: return 2.86391544f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree26(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.59933042f) ? 1 : 16; break;
      case 1: node = (f[9] < 0.66841114f) ? 2 : 9; break;
      case 2: node = (f[3] < -0.15248361f) ? 3 : 6; break;
      case 3: node = (f[6] < 0.11715262f) ? 4 : 5; break;
      case 4: return 6.51356983f;
      case 5: return 1.45209134f;
      case 6: node = (f[6] < -0.95204073f) ? 7 : 8; break;
      case 7: return 0.85960996f;
      case 8: return -0.67853767f;
      case 9: node = (f[3] < 0.08546055f) ? 10 : 13; break;
      case 10: node = (f[19] < 0.45656341f) ? 11 : 12; break;
      case 11: return -0.63653809f;
      case 12: return -3.52241254f;
      case 13: node = (f[19] < 2.49807858f) ? 14 : 15; break;
      case 14: return -2.91721034f;
      case 15: return -1.11910784f;
      case 16: node = (f[7] < 1.67496192f) ? 17 : 24; break;
      case 17: node = (f[19] < -0.33110288f) ? 18 : 21; break;
      case 18: node = (f[2] < -3.11949372f) ? 19 : 20; break;
      case 19: return 2.10986733f;
      case 20: return -0.08161691f;
      case 21: node = (f[19] < 2.46209431f) ? 22 : 23; break;
      case 22: return 1.78986585f;
      case 23: return -1.13824534f;
      case 24: node = (f[2] < -0.38865954f) ? 25 : 28; break;
      case 25: node = (f[16] < 1.18315101f) ? 26 : 27; break;
      case 26: return 2.21158266f;
      case 27: return 5.12135410f;
      case 28: return 0.81361508f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree27(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.38532636f) ? 1 : 16; break;
      case 1: node = (f[9] < -0.72953862f) ? 2 : 9; break;
      case 2: node = (f[10] < -0.36480918f) ? 3 : 6; break;
      case 3: node = (f[16] < 1.31141758f) ? 4 : 5; break;
      case 4: return 5.18158150f;
      case 5: return 2.80305147f;
      case 6: node = (f[18] < -0.23185813f) ? 7 : 8; break;
      case 7: return 0.12182701f;
      case 8: return 3.93828940f;
      case 9: node = (f[15] < 1.89964676f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.74099910f) ? 11 : 12; break;
      case 11: return 2.65025210f;
      case 12: return 0.01559508f;
      case 13: node = (f[9] < -0.32979271f) ? 14 : 15; break;
      case 14: return 0.79611701f;
      case 15: return 3.41181993f;
      case 16: node = (f[10] < -1.37745023f) ? 17 : 20; break;
      case 17: node = (f[16] < -0.22721088f) ? 18 : 19; break;
      case 18: return -0.42811817f;
      case 19: return 4.89272404f;
      case 20: node = (f[19] < 2.54331064f) ? 21 : 24; break;
      case 21: node = (f[10] < -0.29079267f) ? 22 : 23; break;
      case 22: return -0.65122968f;
      case 23: return -2.12654853f;
      case 24: return 3.17112136f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree28(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.56208438f) ? 1 : 16; break;
      case 1: node = (f[9] < -0.40825275f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.16374545f) ? 3 : 6; break;
      case 3: node = (f[1] < 0.55457413f) ? 4 : 5; break;
      case 4: return 2.05680466f;
      case 5: return 4.76437044f;
      case 6: node = (f[10] < -0.98664200f) ? 7 : 8; break;
      case 7: return 3.25506973f;
      case 8: return 0.47165996f;
      case 9: node = (f[2] < -0.60381961f) ? 10 : 13; break;
      case 10: node = (f[8] < -0.06169236f) ? 11 : 12; break;
      case 11: return 5.30443144f;
      case 12: return 0.73750222f;
      case 13: node = (f[9] < 0.66841114f) ? 14 : 15; break;
      case 14: return -0.04583609f;
      case 15: return -1.49864411f;
      case 16: node = (f[10] < -1.25476754f) ? 17 : 22; break;
      case 17: node = (f[3] < 0.70604658f) ? 18 : 19; break;
      case 18: return 3.98001742f;
      case 19: node = (f[15] < -0.26003733f) ? 20 : 21; break;
      case 20: return 0.34557656f;
      case 21: return -1.75914168f;
      case 22: node = (f[2] < 0.92531121f) ? 23 : 26; break;
      case 23: node = (f[8] < -0.02778410f) ? 24 : 25; break;
      case 24: return -0.73672003f;
      case 25: return -2.09501004f;
      case 26: node = (f[5] < 1.05214775f) ? 27 : 28; break;
      case 27: return -2.97628379f;
      case 28: return -1.59774101f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree29(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.90548223f) ? 1 : 14; break;
      case 1: node = (f[2] < 0.67358148f) ? 2 : 9; break;
      case 2: node = (f[9] < -0.15133616f) ? 3 : 6; break;
      case 3: node = (f[14] < -1.06081903f) ? 4 : 5; break;
      case 4: return 2.97411680f;
      case 5: return 0.63485914f;
      case 6: node = (f[19] < 2.55331969f) ? 7 : 8; break;
      case 7: return -0.66787911f;
      case 8: return 3.44742298f;
      case 9: node = (f[8] < -0.02778410f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.80818367f) ? 11 : 12; break;
      case 11: return -0.23342925f;
      case 12: return -1.49267066f;
      case 13: return -2.39399409f;
      case 14: node = (f[9] < -0.76252383f) ? 15 : 18; break;
      case 15: node = (f[3] < -0.18655567f) ? 16 : 17; break;
      case 16: return 4.97546530f;
      case 17: return 1.77700019f;
      case 18: node = (f[8] < -0.68996739f) ? 19 : 20; break;
      case 19: return -1.99680173f;
      case 20: node = (f[19] < 0.94771415f) ? 21 : 22; break;
      case 21: return 1.25608826f;
      case 22: return 5.05886173f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree30(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 0.90548223f) ? 1 : 16; break;
      case 1: node = (f[4] < -0.52238756f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.86510289f) ? 3 : 6; break;
      case 3: node = (f[14] < -1.67672515f) ? 4 : 5; break;
      case 4: return 4.24275732f;
      case 5: return 1.67644835f;
      case 6: node = (f[15] < -0.80956185f) ? 7 : 8; break;
      case 7: return -1.27013373f;
      case 8: return 0.52703637f;
      case 9: node = (f[19] < 2.54331064f) ? 10 : 13; break;
      case 10: node = (f[19] < 2.51857758f) ? 11 : 12; break;
      case 11: return -0.58414727f;
      case 12: return -5.08182526f;
      case 13: node = (f[9] < 0.75543767f) ? 14 : 15; break;
      case 14: return 4.46687365f;
      case 15: return 0.71926093f;
      case 16: node = (f[7] < 1.67496192f) ? 17 : 22; break;
      case 17: node = (f[6] < -0.79929119f) ? 18 : 19; break;
      case 18: return 3.13826084f;
      case 19: node = (f[1] < -1.46846390f) ? 20 : 21; break;
      case 20: return 1.92717063f;
      case 21: return 0.40092459f;
      case 22: node = (f[9] < -0.08638983f) ? 23 : 26; break;
      case 23: node = (f[0] < 0.04891033f) ? 24 : 25; break;
      case 24: return 2.41672015f;
      case 25: return 5.26782227f;
      case 26: return 1.20297539f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree31(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.11140343f) ? 1 : 16; break;
      case 1: node = (f[10] < -0.43780816f) ? 2 : 9; break;
      case 2: node = (f[3] < -0.00751522f) ? 3 : 6; break;
      case 3: node = (f[14] < 0.34274197f) ? 4 : 5; break;
      case 4: return 6.05715418f;
      case 5: return 1.49866283f;
      case 6: node = (f[23] < -0.59524441f) ? 7 : 8; break;
      case 7: return -0.32610461f;
      case 8: return 3.09241796f;
      case 9: node = (f[3] < -1.85744274f) ? 10 : 13; break;
      case 10: node = (f[16] < 0.76876348f) ? 11 : 12; break;
      case 11: return 1.57456875f;
      case 12: return 4.32421780f;
      case 13: node = (f[16] < -1.09494174f) ? 14 : 15; break;
      case 14: return -1.01737106f;
      case 15: return 0.63182336f;
      case 16: node = (f[9] < -1.03184998f) ? 17 : 24; break;
      case 17: node = (f[3] < 0.76925081f) ? 18 : 21; break;
      case 18: node = (f[14] < -1.26407027f) ? 19 : 20; break;
      case 19: return 3.11393523f;
      case 20: return 0.39109066f;
      case 21: node = (f[3] < 0.94214821f) ? 22 : 23; break;
      case 22: return -0.13303892f;
      case 23: return -1.40716946f;
      case 24: node = (f[16] < -0.07842532f) ? 25 : 28; break;
      case 25: node = (f[19] < 2.54331064f) ? 26 : 27; break;
      case 26: return -1.43648493f;
      case 27: return 1.43097162f;
      case 28: node = (f[19] < 0.42863905f) ? 29 : 30; break;
      case 29: return -0.54888094f;
      case 30: return 2.94116020f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree32(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.09522031f) ? 1 : 16; break;
      case 1: node = (f[10] < -0.40805957f) ? 2 : 9; break;
      case 2: node = (f[4] < -0.44891593f) ? 3 : 6; break;
      case 3: node = (f[14] < 0.30354649f) ? 4 : 5; break;
      case 4: return 3.34607291f;
      case 5: return -1.96121168f;
      case 6: node = (f[5] < 0.52895868f) ? 7 : 8; break;
      case 7: return 6.53219843f;
      case 8: return 3.39146805f;
      case 9: node = (f[2] < -1.86658847f) ? 10 : 13; break;
      case 10: node = (f[15] < 1.94923878f) ? 11 : 12; break;
      case 11: return 1.03972661f;
      case 12: return 3.28219938f;
      case 13: node = (f[6] < 0.74989456f) ? 14 : 15; break;
      case 14: return 0.64823937f;
      case 15: return -0.72323591f;
      case 16: node = (f[6] < -1.37229407f) ? 17 : 18; break;
      case 17: return 4.26265860f;
      case 18: node = (f[19] < -0.22577003f) ? 19 : 22; break;
      case 19: node = (f[6] < -0.99345207f) ? 20 : 21; break;
      case 20: return -0.03072480f;
      case 21: return -1.35325682f;
      case 22: node = (f[2] < 0.68467826f) ? 23 : 24; break;
      case 23: return 0.29998303f;
      case 24: return -1.06083429f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree33(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.38532636f) ? 1 : 14; break;
      case 1: node = (f[9] < 0.27098700f) ? 2 : 7; break;
      case 2: node = (f[19] < 2.46209431f) ? 3 : 6; break;
      case 3: node = (f[3] < -0.60775733f) ? 4 : 5; break;
      case 4: return 4.05471563f;
      case 5: return 1.05739832f;
      case 6: return -3.79362154f;
      case 7: node = (f[2] < -1.86658847f) ? 8 : 11; break;
      case 8: node = (f[15] < 1.94923878f) ? 9 : 10; break;
      case 9: return 0.87878281f;
      case 10: return 2.58476138f;
      case 11: node = (f[19] < 2.54331064f) ? 12 : 13; break;
      case 12: return -0.65632886f;
      case 13: return 3.55653262f;
      case 14: node = (f[6] < -1.37229407f) ? 15 : 16; break;
      case 15: return 4.20716238f;
      case 16: node = (f[6] < -0.99345207f) ? 17 : 20; break;
      case 17: node = (f[3] < 0.86626458f) ? 18 : 19; break;
      case 18: return 0.78921914f;
      case 19: return -1.15223908f;
      case 20: node = (f[19] < 0.94771415f) ? 21 : 22; break;
      case 21: return -1.14823627f;
      case 22: return 0.75190330f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree34(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.38532636f) ? 1 : 16; break;
      case 1: node = (f[10] < -0.43780816f) ? 2 : 9; break;
      case 2: node = (f[14] < -0.36880603f) ? 3 : 6; break;
      case 3: node = (f[5] < -1.27335870f) ? 4 : 5; break;
      case 4: return 2.41182327f;
      case 5: return 4.35290861f;
      case 6: node = (f[3] < -0.07752141f) ? 7 : 8; break;
      case 7: return 3.42393661f;
      case 8: return 0.73925126f;
      case 9: node = (f[3] < -0.30590758f) ? 10 : 13; break;
      case 10: node = (f[19] < 2.46209431f) ? 11 : 12; break;
      case 11: return 0.94419467f;
      case 12: return -2.16336870f;
      case 13: node = (f[19] < 2.51136065f) ? 14 : 15; break;
      case 14: return -0.54285675f;
      case 15: return 1.86179602f;
      case 16: node = (f[6] < -0.99345207f) ? 17 : 24; break;
      case 17: node = (f[3] < 0.66595012f) ? 18 : 21; break;
      case 18: node = (f[6] < -1.25483274f) ? 19 : 20; break;
      case 19: return 4.04270601f;
      case 20: return 0.92767751f;
      case 21: node = (f[11] < 0.49997872f) ? 22 : 23; break;
      case 22: return -0.01460450f;
      case 23: return -2.18409228f;
      case 24: node = (f[19] < 1.12835264f) ? 25 : 28; break;
      case 25: node = (f[5] < -0.64594263f) ? 26 : 27; break;
      case 26: return -0.53029048f;
      case 27: return -1.38881421f;
      case 28: node = (f[5] < 1.43987799f) ? 29 : 30; break;
      case 29: return 2.31417680f;
      case 30: return -1.57791150f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree35(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.61248934f) ? 1 : 16; break;
      case 1: node = (f[9] < -1.16891479f) ? 2 : 9; break;
      case 2: node = (f[14] < -1.22067678f) ? 3 : 6; break;
      case 3: node = (f[10] < -0.77967280f) ? 4 : 5; break;
      case 4: return 5.79905081f;
      case 5: return 2.56742024f;
      case 6: node = (f[2] < 0.41064644f) ? 7 : 8; break;
      case 7: return 2.34623933f;
      case 8: return -0.18954070f;
      case 9: node = (f[3] < 0.08546055f) ? 10 : 13; break;
      case 10: node = (f[8] < -0.31932139f) ? 11 : 12; break;
      case 11: return 2.43686247f;
      case 12: return 0.26120716f;
      case 13: node = (f[10] < -0.88620394f) ? 14 : 15; break;
      case 14: return 1.25763583f;
      case 15: return -0.64987808f;
      case 16: node = (f[10] < -1.25476754f) ? 17 : 22; break;
      case 17: node = (f[2] < 0.70790321f) ? 18 : 19; break;
      case 18: return 2.12107873f;
      case 19: node = (f[14] < -0.71463174f) ? 20 : 21; break;
      case 20: return 0.85004210f;
      case 21: return -0.87475896f;
      case 22: node = (f[2] < 0.92531121f) ? 23 : 26; break;
      case 23: node = (f[14] < 0.12037825f) ? 24 : 25; break;
      case 24: return -0.52754146f;
      case 25: return -2.15869379f;
      case 26: node = (f[4] < 1.09437704f) ? 27 : 28; break;
      case 27: return -2.23221684f;
      case 28: return -1.36447358f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree36(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.32529327f) ? 1 : 16; break;
      case 1: node = (f[6] < -1.07166147f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.89250702f) ? 3 : 6; break;
      case 3: node = (f[8] < -0.94505078f) ? 4 : 5; break;
      case 4: return 0.37623042f;
      case 5: return 2.91400838f;
      case 6: node = (f[10] < -1.25476754f) ? 7 : 8; break;
      case 7: return -0.14584820f;
      case 8: return -1.58130610f;
      case 9: node = (f[3] < -0.10637850f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.16089317f) ? 11 : 12; break;
      case 11: return 3.41134906f;
      case 12: return 0.06945826f;
      case 13: node = (f[6] < 0.90800005f) ? 14 : 15; break;
      case 14: return -0.90230244f;
      case 15: return -2.28643346f;
      case 16: node = (f[12] < -1.22898149f) ? 17 : 24; break;
      case 17: node = (f[18] < 0.19282350f) ? 18 : 21; break;
      case 18: node = (f[17] < -0.22582249f) ? 19 : 20; break;
      case 19: return -5.00745916f;
      case 20: return -0.07786210f;
      case 21: node = (f[7] < -1.19147921f) ? 22 : 23; break;
      case 22: return -0.49824533f;
      case 23: return 2.90553951f;
      case 24: node = (f[3] < 0.67825919f) ? 25 : 28; break;
      case 25: node = (f[6] < -1.27377391f) ? 26 : 27; break;
      case 26: return 5.66035795f;
      case 27: return 0.74556869f;
      case 28: node = (f[9] < -1.01559746f) ? 29 : 30; break;
      case 29: return 0.33440679f;
      case 30: return -1.17744339f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree37(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.80818367f) ? 1 : 14; break;
      case 1: node = (f[9] < -1.28502524f) ? 2 : 7; break;
      case 2: node = (f[10] < -1.18435919f) ? 3 : 4; break;
      case 3: return 5.09439945f;
      case 4: node = (f[2] < 0.37662145f) ? 5 : 6; break;
      case 5: return 2.77544117f;
      case 6: return 0.02034224f;
      case 7: node = (f[2] < -0.34442949f) ? 8 : 11; break;
      case 8: node = (f[19] < 2.51136065f) ? 9 : 10; break;
      case 9: return 0.84001249f;
      case 10: return -3.85576034f;
      case 11: node = (f[6] < -0.26094511f) ? 12 : 13; break;
      case 12: return 0.15102987f;
      case 13: return -0.79185361f;
      case 14: node = (f[6] < -1.15237379f) ? 15 : 20; break;
      case 15: node = (f[1] < 0.30895111f) ? 16 : 17; break;
      case 16: return 1.36212647f;
      case 17: node = (f[7] < -0.23831758f) ? 18 : 19; break;
      case 18: return 0.07559244f;
      case 19: return -1.53408384f;
      case 20: node = (f[11] < -0.83072066f) ? 21 : 24; break;
      case 21: node = (f[0] < 0.97065270f) ? 22 : 23; break;
      case 22: return -1.38954186f;
      case 23: return 0.38891646f;
      case 24: node = (f[9] < -0.64907706f) ? 25 : 26; break;
      case 25: return -2.39975405f;
      case 26: return -1.04801095f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree38(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.60347187f) ? 1 : 14; break;
      case 1: node = (f[6] < -1.05906701f) ? 2 : 7; break;
      case 2: node = (f[7] < 0.25714871f) ? 3 : 4; break;
      case 3: return 0.42733923f;
      case 4: node = (f[18] < -0.60706609f) ? 5 : 6; break;
      case 5: return 1.08209085f;
      case 6: return 4.43745852f;
      case 7: node = (f[2] < 0.11070576f) ? 8 : 11; break;
      case 8: node = (f[6] < -0.44543019f) ? 9 : 10; break;
      case 9: return 2.23794174f;
      case 10: return 0.29012251f;
      case 11: node = (f[10] < -0.88620394f) ? 12 : 13; break;
      case 12: return 1.13323903f;
      case 13: return -0.53177756f;
      case 14: node = (f[6] < -1.37229407f) ? 15 : 16; break;
      case 15: return 3.50141144f;
      case 16: node = (f[2] < 0.92531121f) ? 17 : 20; break;
      case 17: node = (f[14] < -1.29962718f) ? 18 : 19; break;
      case 18: return 0.47026691f;
      case 19: return -0.74506199f;
      case 20: node = (f[6] < -1.20142722f) ? 21 : 22; break;
      case 21: return -0.49924910f;
      case 22: return -1.75266623f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree39(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[15] < 1.89964676f) ? 1 : 10; break;
      case 1: node = (f[19] < 2.55331969f) ? 2 : 9; break;
      case 2: node = (f[19] < 2.51136065f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.78760225f) ? 4 : 5; break;
      case 4: return -0.16008806f;
      case 5: return 1.75019646f;
      case 6: node = (f[11] < -0.13937506f) ? 7 : 8; break;
      case 7: return -0.64200330f;
      case 8: return -4.35903597f;
      case 9: return 3.21193480f;
      case 10: node = (f[8] < 0.26080465f) ? 11 : 14; break;
      case 11: node = (f[1] < -0.12005155f) ? 12 : 13; break;
      case 12: return -1.02293205f;
      case 13: return 2.14011121f;
      case 14: node = (f[2] < -4.04754353f) ? 15 : 16; break;
      case 15: return 3.24001527f;
      case 16: node = (f[5] < -0.64594263f) ? 17 : 18; break;
      case 17: return 2.44645000f;
      case 18: return 0.83687359f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree40(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.76925081f) ? 1 : 16; break;
      case 1: node = (f[9] < -0.74266863f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.37844956f) ? 3 : 6; break;
      case 3: node = (f[18] < -0.66809946f) ? 4 : 5; break;
      case 4: return 3.68821192f;
      case 5: return 1.57104027f;
      case 6: node = (f[11] < 0.20505737f) ? 7 : 8; break;
      case 7: return 1.49043822f;
      case 8: return -0.11822286f;
      case 9: node = (f[3] < -0.27471989f) ? 10 : 13; break;
      case 10: node = (f[0] < 1.22203708f) ? 11 : 12; break;
      case 11: return 0.35739535f;
      case 12: return 3.62275529f;
      case 13: node = (f[19] < 2.55331969f) ? 14 : 15; break;
      case 14: return -0.44465888f;
      case 15: return 3.57949924f;
      case 16: node = (f[9] < -1.30565941f) ? 17 : 22; break;
      case 17: node = (f[1] < 0.10006128f) ? 18 : 19; break;
      case 18: return -1.35310209f;
      case 19: node = (f[3] < 0.90798116f) ? 20 : 21; break;
      case 20: return 2.58857846f;
      case 21: return -0.68106246f;
      case 22: node = (f[3] < 0.94214821f) ? 23 : 26; break;
      case 23: node = (f[18] < -0.25191373f) ? 24 : 25; break;
      case 24: return -0.46892297f;
      case 25: return -1.40721464f;
      case 26: node = (f[12] < -0.48748672f) ? 27 : 28; break;
      case 27: return -0.29600942f;
      case 28: return -1.95792019f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree41(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.14590979f) ? 1 : 12; break;
      case 1: node = (f[2] < 0.69911832f) ? 2 : 7; break;
      case 2: node = (f[7] < 0.25714871f) ? 3 : 4; break;
      case 3: return 0.61326689f;
      case 4: node = (f[15] < 0.11547101f) ? 5 : 6; break;
      case 5: return 4.37795210f;
      case 6: return 2.20321798f;
      case 7: node = (f[15] < -0.09337533f) ? 8 : 11; break;
      case 8: node = (f[3] < 0.95578635f) ? 9 : 10; break;
      case 9: return 1.17612803f;
      case 10: return -0.62619728f;
      case 11: return -1.63642406f;
      case 12: node = (f[3] < 0.26992303f) ? 13 : 20; break;
      case 13: node = (f[6] < -0.44543019f) ? 14 : 17; break;
      case 14: node = (f[1] < -0.22523892f) ? 15 : 16; break;
      case 15: return 0.08872731f;
      case 16: return 2.19315195f;
      case 17: node = (f[2] < -1.86658847f) ? 18 : 19; break;
      case 18: return 1.32208192f;
      case 19: return -0.18911588f;
      case 20: node = (f[16] < -1.67048442f) ? 21 : 22; break;
      case 21: return 1.59876299f;
      case 22: node = (f[14] < 0.19746132f) ? 23 : 24; break;
      case 23: return -0.43472198f;
      case 24: return -1.41590309f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree42(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.37229407f) ? 1 : 2; break;
      case 1: return 4.28868818f;
      case 2: node = (f[3] < 0.26992303f) ? 3 : 10; break;
      case 3: node = (f[9] < -0.40825275f) ? 4 : 7; break;
      case 4: node = (f[4] < -0.58290029f) ? 5 : 6; break;
      case 5: return 1.11451530f;
      case 6: return 2.86125016f;
      case 7: node = (f[15] < 2.42355776f) ? 8 : 9; break;
      case 8: return 0.02633797f;
      case 9: return 3.12756467f;
      case 10: node = (f[6] < -1.07166147f) ? 11 : 14; break;
      case 11: node = (f[3] < 0.56622809f) ? 12 : 13; break;
      case 12: return 2.83638239f;
      case 13: return -0.14219283f;
      case 14: node = (f[15] < 0.26106420f) ? 15 : 16; break;
      case 15: return -0.33939600f;
      case 16: return -1.83449113f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree43(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[4] < -0.86719531f) ? 1 : 12; break;
      case 1: node = (f[19] < 1.12835264f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.86510289f) ? 3 : 6; break;
      case 3: node = (f[18] < -0.38370901f) ? 4 : 5; break;
      case 4: return 1.10573077f;
      case 5: return 2.85966730f;
      case 6: node = (f[2] < -1.48173690f) ? 7 : 8; break;
      case 7: return 1.71395242f;
      case 8: return 0.03329680f;
      case 9: node = (f[2] < -0.13331558f) ? 10 : 11; break;
      case 10: return 4.76947641f;
      case 11: return 2.45046115f;
      case 12: node = (f[17] < -0.30626968f) ? 13 : 20; break;
      case 13: node = (f[10] < -1.25476754f) ? 14 : 17; break;
      case 14: node = (f[11] < -0.15923752f) ? 15 : 16; break;
      case 15: return -0.02175191f;
      case 16: return 3.15986514f;
      case 17: node = (f[19] < 2.30029607f) ? 18 : 19; break;
      case 18: return -0.66179788f;
      case 19: return -2.29746413f;
      case 20: node = (f[19] < 0.35846549f) ? 21 : 24; break;
      case 21: node = (f[2] < -0.34442949f) ? 22 : 23; break;
      case 22: return 0.69482887f;
      case 23: return -0.31425753f;
      case 24: node = (f[14] < 0.88786435f) ? 25 : 26; break;
      case 25: return 2.21903443f;
      case 26: return -1.31138527f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree44(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < -0.07842532f) ? 1 : 14; break;
      case 1: node = (f[17] < -0.36660504f) ? 2 : 7; break;
      case 2: node = (f[18] < -0.26775760f) ? 3 : 4; break;
      case 3: return -3.73197246f;
      case 4: node = (f[16] < -1.65580547f) ? 5 : 6; break;
      case 5: return 0.77158290f;
      case 6: return -0.83440399f;
      case 7: node = (f[2] < 0.33185035f) ? 8 : 11; break;
      case 8: node = (f[10] < -0.02849580f) ? 9 : 10; break;
      case 9: return 1.22968340f;
      case 10: return -0.12732421f;
      case 11: node = (f[6] < -0.87571341f) ? 12 : 13; break;
      case 12: return 0.41603157f;
      case 13: return -0.91312790f;
      case 14: node = (f[2] < 0.23093377f) ? 15 : 20; break;
      case 15: node = (f[10] < -0.73082179f) ? 16 : 17; break;
      case 16: return 3.10211325f;
      case 17: node = (f[2] < -0.35925534f) ? 18 : 19; break;
      case 18: return 1.21845758f;
      case 19: return 0.24901411f;
      case 20: node = (f[10] < -1.29418147f) ? 21 : 24; break;
      case 21: node = (f[5] < 0.65384239f) ? 22 : 23; break;
      case 22: return -0.34609267f;
      case 23: return 2.97893214f;
      case 24: node = (f[2] < 0.94241887f) ? 25 : 26; break;
      case 25: return -0.03666008f;
      case 26: return -1.47036958f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree45(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.38392341f) ? 1 : 16; break;
      case 1: node = (f[1] < -0.15852100f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.23816329f) ? 3 : 6; break;
      case 3: node = (f[8] < 0.29065868f) ? 4 : 5; break;
      case 4: return 1.56364822f;
      case 5: return -0.05657508f;
      case 6: node = (f[19] < -0.67874294f) ? 7 : 8; break;
      case 7: return -0.27427808f;
      case 8: return -1.13201332f;
      case 9: node = (f[9] < -0.83962286f) ? 10 : 13; break;
      case 10: node = (f[4] < 0.24196452f) ? 11 : 12; break;
      case 11: return 0.47845730f;
      case 12: return -0.66502303f;
      case 13: node = (f[19] < -0.62522429f) ? 14 : 15; break;
      case 14: return -1.21738946f;
      case 15: return -0.55961376f;
      case 16: node = (f[2] < 0.80818367f) ? 17 : 24; break;
      case 17: node = (f[9] < -0.59335440f) ? 18 : 21; break;
      case 18: node = (f[7] < 0.51706272f) ? 19 : 20; break;
      case 19: return 1.71875846f;
      case 20: return 0.42199114f;
      case 21: node = (f[19] < 2.55331969f) ? 22 : 23; break;
      case 22: return 0.12066659f;
      case 23: return 2.36275244f;
      case 24: node = (f[15] < -0.85438991f) ? 25 : 28; break;
      case 25: node = (f[8] < -1.04466331f) ? 26 : 27; break;
      case 26: return 0.75178814f;
      case 27: return -0.98048157f;
      case 28: return -3.06739831f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree46(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < -1.18131125f) ? 1 : 12; break;
      case 1: node = (f[19] < 2.30029607f) ? 2 : 9; break;
      case 2: node = (f[1] < -0.16653077f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.31557348f) ? 4 : 5; break;
      case 4: return 0.26544735f;
      case 5: return -1.05593848f;
      case 6: node = (f[10] < 0.16570552f) ? 7 : 8; break;
      case 7: return 0.05125230f;
      case 8: return -1.15397334f;
      case 9: node = (f[19] < 2.54331064f) ? 10 : 11; break;
      case 10: return -4.31749773f;
      case 11: return 0.06508057f;
      case 12: node = (f[19] < 0.31962639f) ? 13 : 20; break;
      case 13: node = (f[3] < 0.85962826f) ? 14 : 17; break;
      case 14: node = (f[6] < -1.21838534f) ? 15 : 16; break;
      case 15: return 2.30633855f;
      case 16: return -0.03104310f;
      case 17: node = (f[19] < -0.13941678f) ? 18 : 19; break;
      case 18: return -0.70026994f;
      case 19: return -1.90586686f;
      case 20: node = (f[5] < 1.43101275f) ? 21 : 24; break;
      case 21: node = (f[10] < -1.02879667f) ? 22 : 23; break;
      case 22: return -1.44147837f;
      case 23: return 2.19586492f;
      case 24: node = (f[9] < -0.46597692f) ? 25 : 26; break;
      case 25: return -0.08270895f;
      case 26: return -2.55548525f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree47(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.70604658f) ? 1 : 14; break;
      case 1: node = (f[6] < -1.05906701f) ? 2 : 7; break;
      case 2: node = (f[22] < -0.58392656f) ? 3 : 4; break;
      case 3: return -0.23559813f;
      case 4: node = (f[18] < -0.36223066f) ? 5 : 6; break;
      case 5: return 1.20933342f;
      case 6: return 3.85871458f;
      case 7: node = (f[19] < -0.32529327f) ? 8 : 11; break;
      case 8: node = (f[2] < -0.13331558f) ? 9 : 10; break;
      case 9: return 0.06928229f;
      case 10: return -0.75327438f;
      case 11: node = (f[8] < -1.19688189f) ? 12 : 13; break;
      case 12: return -2.83653688f;
      case 13: return 0.46145189f;
      case 14: node = (f[14] < -0.90062380f) ? 15 : 22; break;
      case 15: node = (f[22] < 0.63495880f) ? 16 : 19; break;
      case 16: node = (f[8] < -1.04466331f) ? 17 : 18; break;
      case 17: return 2.24883914f;
      case 18: return 0.19201766f;
      case 19: node = (f[14] < -1.06081903f) ? 20 : 21; break;
      case 20: return -0.76838881f;
      case 21: return 0.79235435f;
      case 22: node = (f[15] < -0.26511404f) ? 23 : 26; break;
      case 23: node = (f[22] < -0.71089375f) ? 24 : 25; break;
      case 24: return 0.08507522f;
      case 25: return -0.91737974f;
      case 26: return -2.28992200f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree48(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[4] < -0.86719531f) ? 1 : 8; break;
      case 1: node = (f[0] < 1.13824224f) ? 2 : 7; break;
      case 2: node = (f[6] < -1.11572599f) ? 3 : 4; break;
      case 3: return 2.33242178f;
      case 4: node = (f[3] < -0.30590758f) ? 5 : 6; break;
      case 5: return 0.89460790f;
      case 6: return -0.03203836f;
      case 7: return 2.72598219f;
      case 8: node = (f[0] < 1.12148333f) ? 9 : 14; break;
      case 9: node = (f[0] < 1.07958591f) ? 10 : 13; break;
      case 10: node = (f[11] < -0.65273565f) ? 11 : 12; break;
      case 11: return -0.70202148f;
      case 12: return -0.07840130f;
      case 13: return -2.24250412f;
      case 14: node = (f[4] < -0.00666862f) ? 15 : 18; break;
      case 15: node = (f[2] < 0.18164039f) ? 16 : 17; break;
      case 16: return 4.59681702f;
      case 17: return 0.99547577f;
      case 18: node = (f[15] < -0.32009724f) ? 19 : 20; break;
      case 19: return 0.92783982f;
      case 20: return -0.43444872f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree49(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 0.15511636f) ? 1 : 16; break;
      case 1: node = (f[1] < -0.35479891f) ? 2 : 9; break;
      case 2: node = (f[11] < -1.37213218f) ? 3 : 6; break;
      case 3: node = (f[12] < 0.54312247f) ? 4 : 5; break;
      case 4: return -1.55499887f;
      case 5: return -0.64482373f;
      case 6: node = (f[12] < 1.34039903f) ? 7 : 8; break;
      case 7: return 0.26764980f;
      case 8: return 1.43984199f;
      case 9: node = (f[9] < 0.17115059f) ? 10 : 13; break;
      case 10: node = (f[3] < -0.60775733f) ? 11 : 12; break;
      case 11: return 2.51681900f;
      case 12: return -0.18720308f;
      case 13: node = (f[3] < -0.10637850f) ? 14 : 15; break;
      case 14: return -0.35282573f;
      case 15: return -1.04485404f;
      case 16: node = (f[14] < 0.73532951f) ? 17 : 24; break;
      case 17: node = (f[3] < 0.17177507f) ? 18 : 21; break;
      case 18: node = (f[19] < 1.12835264f) ? 19 : 20; break;
      case 19: return 1.16896391f;
      case 20: return 3.56241751f;
      case 21: node = (f[17] < -0.99761260f) ? 22 : 23; break;
      case 22: return 2.56276488f;
      case 23: return 0.08970729f;
      case 24: node = (f[15] < 0.50428975f) ? 25 : 28; break;
      case 25: node = (f[12] < -1.42203903f) ? 26 : 27; break;
      case 26: return -5.21226692f;
      case 27: return -1.77304804f;
      case 28: node = (f[17] < 2.02669835f) ? 29 : 30; break;
      case 29: return 1.01908028f;
      case 30: return -2.16174579f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree50(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.13058701f) ? 1 : 16; break;
      case 1: node = (f[9] < 0.27098700f) ? 2 : 9; break;
      case 2: node = (f[2] < -0.51850235f) ? 3 : 6; break;
      case 3: node = (f[15] < 0.83004051f) ? 4 : 5; break;
      case 4: return 4.78759098f;
      case 5: return 1.62250185f;
      case 6: node = (f[6] < -0.74606216f) ? 7 : 8; break;
      case 7: return 3.31831622f;
      case 8: return 0.20217484f;
      case 9: node = (f[1] < 0.30895111f) ? 10 : 13; break;
      case 10: node = (f[14] < 1.65379012f) ? 11 : 12; break;
      case 11: return -0.04030367f;
      case 12: return 1.19564545f;
      case 13: node = (f[16] < -1.47183299f) ? 14 : 15; break;
      case 14: return -3.11875701f;
      case 15: return -0.44801062f;
      case 16: node = (f[10] < -0.26951268f) ? 17 : 24; break;
      case 17: node = (f[2] < 0.69911832f) ? 18 : 21; break;
      case 18: node = (f[15] < -0.28267404f) ? 19 : 20; break;
      case 19: return 0.98387408f;
      case 20: return -0.09984300f;
      case 21: node = (f[15] < -0.16016385f) ? 22 : 23; break;
      case 22: return -0.25576741f;
      case 23: return -1.81194651f;
      case 24: node = (f[5] < 1.21763027f) ? 25 : 28; break;
      case 25: node = (f[8] < 1.75073540f) ? 26 : 27; break;
      case 26: return -0.83815986f;
      case 27: return -2.09205484f;
      case 28: node = (f[23] < -0.94867271f) ? 29 : 30; break;
      case 29: return -1.00442326f;
      case 30: return 2.62688875f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree51(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < -0.07842532f) ? 1 : 14; break;
      case 1: node = (f[17] < -0.33643737f) ? 2 : 7; break;
      case 2: node = (f[19] < 2.56111693f) ? 3 : 6; break;
      case 3: node = (f[19] < 2.37643528f) ? 4 : 5; break;
      case 4: return -0.54177755f;
      case 5: return -3.30515456f;
      case 6: return 1.74164426f;
      case 7: node = (f[11] < 0.81590050f) ? 8 : 11; break;
      case 8: node = (f[3] < 0.30431846f) ? 9 : 10; break;
      case 9: return 0.00749755f;
      case 10: return -0.49181536f;
      case 11: node = (f[18] < -0.38435957f) ? 12 : 13; break;
      case 12: return 2.03999329f;
      case 13: return -0.06362793f;
      case 14: node = (f[19] < 0.78760225f) ? 15 : 22; break;
      case 15: node = (f[6] < -1.05906701f) ? 16 : 19; break;
      case 16: node = (f[3] < 0.66595012f) ? 17 : 18; break;
      case 17: return 2.52652240f;
      case 18: return -0.09577585f;
      case 19: node = (f[3] < -0.30590758f) ? 20 : 21; break;
      case 20: return 0.75939053f;
      case 21: return -0.17142484f;
      case 22: node = (f[19] < 2.46209431f) ? 23 : 26; break;
      case 23: node = (f[23] < -0.51173651f) ? 24 : 25; break;
      case 24: return 1.38825142f;
      case 25: return 4.56087589f;
      case 26: return -0.38476017f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree52(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.68467826f) ? 1 : 10; break;
      case 1: node = (f[6] < -1.27377391f) ? 2 : 3; break;
      case 2: return 3.75041032f;
      case 3: node = (f[12] < 1.38474810f) ? 4 : 7; break;
      case 4: node = (f[5] < -1.22912955f) ? 5 : 6; break;
      case 5: return 0.50439191f;
      case 6: return -0.19905424f;
      case 7: node = (f[2] < -0.48091456f) ? 8 : 9; break;
      case 8: return 2.10592079f;
      case 9: return 0.42388317f;
      case 10: node = (f[15] < -0.26003733f) ? 11 : 18; break;
      case 11: node = (f[2] < 0.80818367f) ? 12 : 15; break;
      case 12: node = (f[11] < -1.02271092f) ? 13 : 14; break;
      case 13: return -0.87572330f;
      case 14: return 0.33591768f;
      case 15: node = (f[23] < -0.38173810f) ? 16 : 17; break;
      case 16: return -0.24232826f;
      case 17: return -1.13350105f;
      case 18: node = (f[11] < 0.45888022f) ? 19 : 20; break;
      case 19: return -1.32282925f;
      case 20: return -3.05779648f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree53(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.37229407f) ? 1 : 2; break;
      case 1: return 3.43375516f;
      case 2: node = (f[11] < -1.37213218f) ? 3 : 10; break;
      case 3: node = (f[7] < 0.89580107f) ? 4 : 7; break;
      case 4: node = (f[4] < -0.32808766f) ? 5 : 6; break;
      case 5: return -1.03073823f;
      case 6: return -2.04759264f;
      case 7: node = (f[22] < 0.33023745f) ? 8 : 9; break;
      case 8: return 0.72156638f;
      case 9: return -1.16220605f;
      case 10: node = (f[5] < -1.22912955f) ? 11 : 14; break;
      case 11: node = (f[7] < 0.61985993f) ? 12 : 13; break;
      case 12: return 0.32751057f;
      case 13: return 1.18107355f;
      case 14: node = (f[0] < 1.12148333f) ? 15 : 16; break;
      case 15: return -0.16065836f;
      case 16: return 0.45266685f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree54(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < 0.26042938f) ? 1 : 14; break;
      case 1: node = (f[3] < -0.09724067f) ? 2 : 9; break;
      case 2: node = (f[6] < 0.14014859f) ? 3 : 6; break;
      case 3: node = (f[23] < 1.08191240f) ? 4 : 5; break;
      case 4: return 2.60872030f;
      case 5: return -0.41331786f;
      case 6: node = (f[1] < -1.19378567f) ? 7 : 8; break;
      case 7: return 0.67630005f;
      case 8: return -0.30079737f;
      case 9: node = (f[19] < 2.54331064f) ? 10 : 13; break;
      case 10: node = (f[6] < -1.34048462f) ? 11 : 12; break;
      case 11: return 1.75243676f;
      case 12: return -0.53047574f;
      case 13: return 1.88359582f;
      case 14: node = (f[3] < -1.42701054f) ? 15 : 20; break;
      case 15: node = (f[9] < 0.37586725f) ? 16 : 17; break;
      case 16: return 3.77879119f;
      case 17: node = (f[1] < -0.43129191f) ? 18 : 19; break;
      case 18: return 1.90032375f;
      case 19: return 0.08449768f;
      case 20: node = (f[9] < -1.32775640f) ? 21 : 24; break;
      case 21: node = (f[7] < 0.52525860f) ? 22 : 23; break;
      case 22: return 3.35199881f;
      case 23: return 0.86670059f;
      case 24: node = (f[19] < 0.07996540f) ? 25 : 26; break;
      case 25: return -0.08804868f;
      case 26: return 0.78872788f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree55(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < -1.18940246f) ? 1 : 14; break;
      case 1: node = (f[23] < -0.80183339f) ? 2 : 7; break;
      case 2: node = (f[14] < 0.57893294f) ? 3 : 4; break;
      case 3: return -0.51624054f;
      case 4: node = (f[0] < 0.06566928f) ? 5 : 6; break;
      case 5: return -1.96722007f;
      case 6: return -4.71199751f;
      case 7: node = (f[2] < 0.11070576f) ? 8 : 11; break;
      case 8: node = (f[6] < 0.78305751f) ? 9 : 10; break;
      case 9: return 0.77396011f;
      case 10: return -0.14985429f;
      case 11: node = (f[9] < 0.97608656f) ? 12 : 13; break;
      case 12: return -0.46921635f;
      case 13: return -1.30497038f;
      case 14: node = (f[3] < -0.71509230f) ? 15 : 22; break;
      case 15: node = (f[9] < 0.38267246f) ? 16 : 19; break;
      case 16: node = (f[7] < 0.36383668f) ? 17 : 18; break;
      case 17: return 3.45400620f;
      case 18: return 1.75907969f;
      case 19: node = (f[2] < -3.11949372f) ? 20 : 21; break;
      case 20: return 1.37942731f;
      case 21: return 0.13286334f;
      case 22: node = (f[6] < -0.75840771f) ? 23 : 26; break;
      case 23: node = (f[2] < 0.56780761f) ? 24 : 25; break;
      case 24: return 1.41168487f;
      case 25: return -0.11877855f;
      case 26: node = (f[11] < 0.44651806f) ? 27 : 28; break;
      case 27: return -0.06344946f;
      case 28: return -0.92677396f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree56(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[9] < -1.32775640f) ? 1 : 10; break;
      case 1: node = (f[7] < 0.36383668f) ? 2 : 3; break;
      case 2: return 3.19962454f;
      case 3: node = (f[16] < 0.65073776f) ? 4 : 7; break;
      case 4: node = (f[6] < -1.13123429f) ? 5 : 6; break;
      case 5: return 0.70456409f;
      case 6: return -0.95564193f;
      case 7: node = (f[1] < 1.21811581f) ? 8 : 9; break;
      case 8: return 1.54602516f;
      case 9: return -0.23682271f;
      case 10: node = (f[11] < -1.47284150f) ? 11 : 14; break;
      case 11: node = (f[12] < 0.74186653f) ? 12 : 13; break;
      case 12: return -1.56343949f;
      case 13: return -0.51396751f;
      case 14: node = (f[5] < -1.00825119f) ? 15 : 18; break;
      case 15: node = (f[19] < 1.48897576f) ? 16 : 17; break;
      case 16: return 0.19932175f;
      case 17: return 2.70198226f;
      case 18: node = (f[5] < -0.90247566f) ? 19 : 20; break;
      case 19: return -1.70930588f;
      case 20: return -0.16331750f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree57(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.37229407f) ? 1 : 2; break;
      case 1: return 2.63426328f;
      case 2: node = (f[4] < 0.19423398f) ? 3 : 10; break;
      case 3: node = (f[19] < 0.94771415f) ? 4 : 7; break;
      case 4: node = (f[6] < -0.76379353f) ? 5 : 6; break;
      case 5: return 0.67354292f;
      case 6: return -0.04004692f;
      case 7: node = (f[12] < -0.42033258f) ? 8 : 9; break;
      case 8: return -0.08677509f;
      case 9: return 2.81140804f;
      case 10: node = (f[18] < 3.34711695f) ? 11 : 14; break;
      case 11: node = (f[19] < 2.55331969f) ? 12 : 13; break;
      case 12: return -0.37224379f;
      case 13: return 1.40251648f;
      case 14: return 1.61639953f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree58(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < 1.12148333f) ? 1 : 16; break;
      case 1: node = (f[4] < -1.05431569f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.86510289f) ? 3 : 6; break;
      case 3: node = (f[17] < -0.13280545f) ? 4 : 5; break;
      case 4: return -0.13443171f;
      case 5: return 1.68752265f;
      case 6: node = (f[3] < -1.42701054f) ? 7 : 8; break;
      case 7: return 1.41635621f;
      case 8: return -0.04591702f;
      case 9: node = (f[0] < 1.07958591f) ? 10 : 13; break;
      case 10: node = (f[1] < 1.11212361f) ? 11 : 12; break;
      case 11: return -0.17831761f;
      case 12: return 1.29028451f;
      case 13: node = (f[5] < 0.52895868f) ? 14 : 15; break;
      case 14: return -0.04341242f;
      case 15: return -3.04355550f;
      case 16: node = (f[5] < -0.04881268f) ? 17 : 20; break;
      case 17: node = (f[4] < -1.29706371f) ? 18 : 19; break;
      case 18: return 1.24327707f;
      case 19: return 4.15788555f;
      case 20: node = (f[10] < -0.91904157f) ? 21 : 24; break;
      case 21: node = (f[0] < 1.25555491f) ? 22 : 23; break;
      case 22: return 2.75211096f;
      case 23: return 0.09728771f;
      case 24: node = (f[1] < 1.06532443f) ? 25 : 26; break;
      case 25: return 0.76255017f;
      case 26: return -0.39130408f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree59(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < 1.43987799f) ? 1 : 16; break;
      case 1: node = (f[19] < 0.78760225f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.92531121f) ? 3 : 6; break;
      case 3: node = (f[6] < -0.76379353f) ? 4 : 5; break;
      case 4: return 0.60819644f;
      case 5: return -0.11383928f;
      case 6: node = (f[5] < 1.05214775f) ? 7 : 8; break;
      case 7: return -1.25343561f;
      case 8: return -0.40108687f;
      case 9: node = (f[12] < -1.39980233f) ? 10 : 13; break;
      case 10: node = (f[12] < -1.58569026f) ? 11 : 12; break;
      case 11: return 0.43428475f;
      case 12: return -3.94407320f;
      case 13: node = (f[18] < -0.35761818f) ? 14 : 15; break;
      case 14: return 3.73514915f;
      case 15: return 1.07983422f;
      case 16: node = (f[19] < 0.24910720f) ? 17 : 20; break;
      case 17: node = (f[12] < 0.28563911f) ? 18 : 19; break;
      case 18: return -0.66945106f;
      case 19: return 0.59377694f;
      case 20: node = (f[18] < -0.26809499f) ? 21 : 24; break;
      case 21: node = (f[12] < -0.51701844f) ? 22 : 23; break;
      case 22: return 0.37914488f;
      case 23: return -2.02112961f;
      case 24: return -4.44603157f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree60(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < 1.43101275f) ? 1 : 10; break;
      case 1: node = (f[2] < -4.04754353f) ? 2 : 3; break;
      case 2: return 2.19105244f;
      case 3: node = (f[9] < 0.59403419f) ? 4 : 7; break;
      case 4: node = (f[2] < 0.30287334f) ? 5 : 6; break;
      case 5: return 0.58567464f;
      case 6: return -0.07591624f;
      case 7: node = (f[2] < -1.40014589f) ? 8 : 9; break;
      case 8: return 0.42803124f;
      case 9: return -0.68231380f;
      case 10: node = (f[9] < -0.67245555f) ? 11 : 14; break;
      case 11: node = (f[16] < 0.37175190f) ? 12 : 13; break;
      case 12: return -3.53653741f;
      case 13: return -1.00651658f;
      case 14: node = (f[4] < 1.05272019f) ? 15 : 16; break;
      case 15: return 1.32655180f;
      case 16: node = (f[1] < 0.60120827f) ? 17 : 18; break;
      case 17: return -2.00401831f;
      case 18: return 0.68065351f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree61(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < -1.31619871f) ? 1 : 8; break;
      case 1: node = (f[7] < 1.62913096f) ? 2 : 7; break;
      case 2: node = (f[2] < -4.04754353f) ? 3 : 4; break;
      case 3: return 2.18397689f;
      case 4: node = (f[5] < -1.00825119f) ? 5 : 6; break;
      case 5: return 1.03670549f;
      case 6: return -0.12842761f;
      case 7: return 2.29971194f;
      case 8: node = (f[10] < 0.41366148f) ? 9 : 14; break;
      case 9: node = (f[19] < 2.54331064f) ? 10 : 13; break;
      case 10: node = (f[3] < -0.30590758f) ? 11 : 12; break;
      case 11: return 1.09222341f;
      case 12: return -0.04854172f;
      case 13: return 3.15443444f;
      case 14: node = (f[6] < 1.52453113f) ? 15 : 18; break;
      case 15: node = (f[11] < 0.63654548f) ? 16 : 17; break;
      case 16: return -0.29242784f;
      case 17: return -1.40582812f;
      case 18: node = (f[12] < -1.27389395f) ? 19 : 20; break;
      case 19: return -2.38838577f;
      case 20: return -0.63947952f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree62(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 2.54331064f) ? 1 : 10; break;
      case 1: node = (f[19] < 2.51857758f) ? 2 : 9; break;
      case 2: node = (f[10] < -0.78145701f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.36977571f) ? 4 : 5; break;
      case 4: return 1.80179191f;
      case 5: return 0.19769199f;
      case 6: node = (f[2] < -0.34442949f) ? 7 : 8; break;
      case 7: return 0.39988643f;
      case 8: return -0.29338247f;
      case 9: return -2.49807239f;
      case 10: node = (f[2] < -0.35925534f) ? 11 : 12; break;
      case 11: return -1.19931149f;
      case 12: return 3.55160761f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree63(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 2.51136065f) ? 1 : 14; break;
      case 1: node = (f[19] < 0.94771415f) ? 2 : 9; break;
      case 2: node = (f[6] < -0.75840771f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.02191177f) ? 4 : 5; break;
      case 4: return 3.54809928f;
      case 5: return 0.27347332f;
      case 6: node = (f[3] < -0.29528296f) ? 7 : 8; break;
      case 7: return 0.22329330f;
      case 8: return -0.34387118f;
      case 9: node = (f[16] < -1.18131125f) ? 10 : 11; break;
      case 10: return -2.00814629f;
      case 11: node = (f[11] < 0.20505737f) ? 12 : 13; break;
      case 12: return 2.72129869f;
      case 13: return 0.19033653f;
      case 14: node = (f[5] < 1.21763027f) ? 15 : 16; break;
      case 15: return -4.69182110f;
      case 16: node = (f[19] < 2.55331969f) ? 17 : 20; break;
      case 17: node = (f[11] < -0.27455837f) ? 18 : 19; break;
      case 18: return 0.54234070f;
      case 19: return -3.09260488f;
      case 20: return 2.84561086f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree64(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 2.28289843f) ? 1 : 16; break;
      case 1: node = (f[19] < 0.26972407f) ? 2 : 9; break;
      case 2: node = (f[13] < 2.92838097f) ? 3 : 6; break;
      case 3: node = (f[0] < 1.32259071f) ? 4 : 5; break;
      case 4: return -0.14931880f;
      case 5: return 0.66032630f;
      case 6: node = (f[11] < -1.21034038f) ? 7 : 8; break;
      case 7: return -0.44403627f;
      case 8: return 1.45114291f;
      case 9: node = (f[12] < -1.32100379f) ? 10 : 13; break;
      case 10: node = (f[12] < -1.66636682f) ? 11 : 12; break;
      case 11: return 1.62845671f;
      case 12: return -2.89822984f;
      case 13: node = (f[5] < 1.43987799f) ? 14 : 15; break;
      case 14: return 1.19537711f;
      case 15: return -0.67485619f;
      case 16: return -2.45499396f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree65(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.80818367f) ? 1 : 14; break;
      case 1: node = (f[6] < -1.05030000f) ? 2 : 9; break;
      case 2: node = (f[14] < -1.23543000f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.66219902f) ? 4 : 5; break;
      case 4: return 2.61233664f;
      case 5: return 0.52735531f;
      case 6: node = (f[1] < 0.83159441f) ? 7 : 8; break;
      case 7: return 0.78869689f;
      case 8: return -1.00904155f;
      case 9: node = (f[8] < -1.19688189f) ? 10 : 11; break;
      case 10: return -2.03028512f;
      case 11: node = (f[15] < 2.42355776f) ? 12 : 13; break;
      case 12: return 0.01607665f;
      case 13: return 2.02494168f;
      case 14: node = (f[15] < -0.69117689f) ? 15 : 22; break;
      case 15: node = (f[23] < -0.06361101f) ? 16 : 19; break;
      case 16: node = (f[3] < 0.95578635f) ? 17 : 18; break;
      case 17: return 0.65488148f;
      case 18: return -0.55564827f;
      case 19: node = (f[17] < -0.13265461f) ? 20 : 21; break;
      case 20: return -1.62558794f;
      case 21: return -0.42344204f;
      case 22: node = (f[1] < 0.49721560f) ? 23 : 24; break;
      case 23: return -2.70501757f;
      case 24: return -0.81413353f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree66(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.34829187f) ? 1 : 4; break;
      case 1: node = (f[2] < 0.80818367f) ? 2 : 3; break;
      case 2: return 3.00700045f;
      case 3: return -0.01227915f;
      case 4: node = (f[11] < -1.47284150f) ? 5 : 10; break;
      case 5: node = (f[23] < -0.06361101f) ? 6 : 7; break;
      case 6: return -0.06550010f;
      case 7: node = (f[5] < -1.15156233f) ? 8 : 9; break;
      case 8: return -1.31293321f;
      case 9: return -0.45730391f;
      case 10: node = (f[11] < 0.22279365f) ? 11 : 14; break;
      case 11: node = (f[5] < -0.04881268f) ? 12 : 13; break;
      case 12: return 0.43096313f;
      case 13: return -0.03325259f;
      case 14: node = (f[8] < 1.32080626f) ? 15 : 16; break;
      case 15: return -0.34939352f;
      case 16: return 0.76967126f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree67(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 2.51136065f) ? 1 : 16; break;
      case 1: node = (f[19] < 0.94771415f) ? 2 : 9; break;
      case 2: node = (f[6] < -1.05906701f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.54298472f) ? 4 : 5; break;
      case 4: return 2.09669113f;
      case 5: return 0.25451842f;
      case 6: node = (f[2] < 0.30731127f) ? 7 : 8; break;
      case 7: return 0.17807944f;
      case 8: return -0.33500546f;
      case 9: node = (f[5] < 1.03303146f) ? 10 : 13; break;
      case 10: node = (f[14] < -0.13195111f) ? 11 : 12; break;
      case 11: return 0.66445732f;
      case 12: return 2.46504378f;
      case 13: node = (f[11] < -0.80353218f) ? 14 : 15; break;
      case 14: return 2.53565693f;
      case 15: return -1.24745214f;
      case 16: node = (f[14] < 0.73532951f) ? 17 : 22; break;
      case 17: node = (f[19] < 2.54331064f) ? 18 : 21; break;
      case 18: node = (f[0] < 0.44274571f) ? 19 : 20; break;
      case 19: return 0.20937388f;
      case 20: return -2.01553631f;
      case 21: return 2.43052173f;
      case 22: node = (f[10] < 0.85813177f) ? 23 : 24; break;
      case 23: return -4.19755125f;
      case 24: return -2.28891444f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree68(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.69911832f) ? 1 : 12; break;
      case 1: node = (f[10] < -1.17131364f) ? 2 : 7; break;
      case 2: node = (f[7] < 0.25714871f) ? 3 : 6; break;
      case 3: node = (f[15] < 0.07160194f) ? 4 : 5; break;
      case 4: return 0.09111948f;
      case 5: return 1.78234267f;
      case 6: return 3.10216236f;
      case 7: node = (f[8] < -1.18324482f) ? 8 : 9; break;
      case 8: return -2.68608475f;
      case 9: node = (f[19] < 2.55331969f) ? 10 : 11; break;
      case 10: return 0.02206230f;
      case 11: return 2.30522394f;
      case 12: node = (f[11] < 0.49997872f) ? 13 : 20; break;
      case 13: node = (f[11] < -0.13384125f) ? 14 : 17; break;
      case 14: node = (f[7] < -1.25802398f) ? 15 : 16; break;
      case 15: return -1.46474326f;
      case 16: return -0.31003541f;
      case 17: node = (f[11] < -0.04846231f) ? 18 : 19; break;
      case 18: return 1.90788460f;
      case 19: return 0.00000000f;
      case 20: return -2.72937727f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree69(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 1.98936665f) ? 1 : 10; break;
      case 1: node = (f[19] < 2.54331064f) ? 2 : 7; break;
      case 2: node = (f[19] < 2.52329206f) ? 3 : 6; break;
      case 3: node = (f[2] < 0.80818367f) ? 4 : 5; break;
      case 4: return 0.08406187f;
      case 5: return -0.48367977f;
      case 6: return -2.21830750f;
      case 7: node = (f[7] < -1.06717885f) ? 8 : 9; break;
      case 8: return 0.25561273f;
      case 9: return 2.85314822f;
      case 10: node = (f[7] < 1.15874422f) ? 11 : 12; break;
      case 11: return -3.34468198f;
      case 12: return 0.73905844f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree70(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -0.81320590f) ? 1 : 8; break;
      case 1: node = (f[19] < 2.48901558f) ? 2 : 7; break;
      case 2: node = (f[19] < 0.78760225f) ? 3 : 6; break;
      case 3: node = (f[1] < 1.34604681f) ? 4 : 5; break;
      case 4: return 0.40880632f;
      case 5: return -0.66552848f;
      case 6: return 2.98338246f;
      case 7: return -1.21110868f;
      case 8: node = (f[1] < -0.32678860f) ? 9 : 16; break;
      case 9: node = (f[11] < -0.84481955f) ? 10 : 13; break;
      case 10: node = (f[8] < 0.02418399f) ? 11 : 12; break;
      case 11: return 0.51801676f;
      case 12: return -0.76139384f;
      case 13: node = (f[12] < 1.32340372f) ? 14 : 15; break;
      case 14: return 0.29687342f;
      case 15: return 1.26939881f;
      case 16: node = (f[19] < 2.54331064f) ? 17 : 20; break;
      case 17: node = (f[19] < 2.51857758f) ? 18 : 19; break;
      case 18: return -0.28713435f;
      case 19: return -2.61141253f;
      case 20: node = (f[16] < -1.09494174f) ? 21 : 22; break;
      case 21: return -0.09726528f;
      case 22: return 2.66171527f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree71(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < 1.43987799f) ? 1 : 16; break;
      case 1: node = (f[19] < 0.21445562f) ? 2 : 9; break;
      case 2: node = (f[11] < -1.47284150f) ? 3 : 6; break;
      case 3: node = (f[12] < 0.63988012f) ? 4 : 5; break;
      case 4: return -1.29415905f;
      case 5: return -0.21983536f;
      case 6: node = (f[15] < 2.42355776f) ? 7 : 8; break;
      case 7: return -0.03364125f;
      case 8: return 1.29236019f;
      case 9: node = (f[18] < -0.30521727f) ? 10 : 13; break;
      case 10: node = (f[2] < 0.64238942f) ? 11 : 12; break;
      case 11: return 0.95727992f;
      case 12: return 4.10681200f;
      case 13: node = (f[14] < 0.60370219f) ? 14 : 15; break;
      case 14: return 0.54525453f;
      case 15: return -1.08634889f;
      case 16: node = (f[19] < 2.51136065f) ? 17 : 20; break;
      case 17: node = (f[7] < -0.16046771f) ? 18 : 19; break;
      case 18: return 1.21383059f;
      case 19: return -1.32679498f;
      case 20: return -3.19540334f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree72(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.37229407f) ? 1 : 2; break;
      case 1: return 1.88183820f;
      case 2: node = (f[8] < -1.19688189f) ? 3 : 8; break;
      case 3: node = (f[1] < 0.10006128f) ? 4 : 5; break;
      case 4: return -3.05118871f;
      case 5: node = (f[7] < -0.41304889f) ? 6 : 7; break;
      case 6: return 0.40499055f;
      case 7: return -0.82234281f;
      case 8: node = (f[3] < 0.26992303f) ? 9 : 12; break;
      case 9: node = (f[10] < -0.72221732f) ? 10 : 11; break;
      case 10: return 1.93940902f;
      case 11: return 0.10460623f;
      case 12: node = (f[11] < 0.20505737f) ? 13 : 14; break;
      case 13: return 0.02389979f;
      case 14: return -0.83311987f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree73(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < 0.54204375f) ? 1 : 16; break;
      case 1: node = (f[10] < 0.41366148f) ? 2 : 9; break;
      case 2: node = (f[4] < 1.26098526f) ? 3 : 6; break;
      case 3: node = (f[11] < 0.35096085f) ? 4 : 5; break;
      case 4: return 0.13253932f;
      case 5: return -0.49568465f;
      case 6: node = (f[14] < 0.33285022f) ? 7 : 8; break;
      case 7: return 0.26996893f;
      case 8: return 3.30947280f;
      case 9: node = (f[2] < -1.72066951f) ? 10 : 13; break;
      case 10: node = (f[14] < 1.83766770f) ? 11 : 12; break;
      case 11: return 0.20359832f;
      case 12: return 1.19940758f;
      case 13: node = (f[5] < 1.42281199f) ? 14 : 15; break;
      case 14: return -0.48083517f;
      case 15: return -1.94281471f;
      case 16: node = (f[8] < 1.42621672f) ? 17 : 24; break;
      case 17: node = (f[11] < 0.81590050f) ? 18 : 21; break;
      case 18: node = (f[2] < 0.96012223f) ? 19 : 20; break;
      case 19: return 0.41056854f;
      case 20: return -0.82412839f;
      case 21: node = (f[0] < 0.78211451f) ? 22 : 23; break;
      case 22: return 0.13547590f;
      case 23: return -1.62323439f;
      case 24: node = (f[6] < 1.08301663f) ? 25 : 26; break;
      case 25: return 2.62103724f;
      case 26: return 0.83242971f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree74(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[16] < -0.07842532f) ? 1 : 14; break;
      case 1: node = (f[19] < 2.54331064f) ? 2 : 9; break;
      case 2: node = (f[19] < 2.24660516f) ? 3 : 6; break;
      case 3: node = (f[15] < 2.13215208f) ? 4 : 5; break;
      case 4: return -0.22511609f;
      case 5: return 1.51899719f;
      case 6: node = (f[15] < -0.63812208f) ? 7 : 8; break;
      case 7: return 0.52186692f;
      case 8: return -2.51435399f;
      case 9: node = (f[14] < 0.82665533f) ? 10 : 13; break;
      case 10: node = (f[11] < -0.37031320f) ? 11 : 12; break;
      case 11: return 1.04735029f;
      case 12: return 3.27068114f;
      case 13: return -1.63332117f;
      case 14: node = (f[19] < 1.12835264f) ? 15 : 22; break;
      case 15: node = (f[2] < 0.85667247f) ? 16 : 19; break;
      case 16: node = (f[10] < -0.90355825f) ? 17 : 18; break;
      case 17: return 0.69546342f;
      case 18: return 0.04399206f;
      case 19: node = (f[15] < -0.81707591f) ? 20 : 21; break;
      case 20: return -0.39773574f;
      case 21: return -1.58150601f;
      case 22: node = (f[9] < -0.61993474f) ? 23 : 24; break;
      case 23: return -0.65981758f;
      case 24: node = (f[11] < 0.01987502f) ? 25 : 26; break;
      case 25: return 4.33932066f;
      case 26: return 1.09336722f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree75(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.37229407f) ? 1 : 2; break;
      case 1: return 1.94449484f;
      case 2: node = (f[2] < 0.80818367f) ? 3 : 10; break;
      case 3: node = (f[6] < -0.23594224f) ? 4 : 7; break;
      case 4: node = (f[3] < -0.17409450f) ? 5 : 6; break;
      case 5: return 1.31657529f;
      case 6: return 0.12712260f;
      case 7: node = (f[2] < -0.96269983f) ? 8 : 9; break;
      case 8: return 0.33401182f;
      case 9: return -0.30046734f;
      case 10: node = (f[11] < -0.15004742f) ? 11 : 14; break;
      case 11: node = (f[19] < 2.48901558f) ? 12 : 13; break;
      case 12: return -0.41395923f;
      case 13: return 1.01345706f;
      case 14: return -1.71112025f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree76(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < -4.04754353f) ? 1 : 2; break;
      case 1: return 1.71045315f;
      case 2: node = (f[6] < 0.58235329f) ? 3 : 10; break;
      case 3: node = (f[2] < -0.35925534f) ? 4 : 7; break;
      case 4: node = (f[15] < 0.37394220f) ? 5 : 6; break;
      case 5: return 2.74158478f;
      case 6: return 0.51019299f;
      case 7: node = (f[15] < 0.68205208f) ? 8 : 9; break;
      case 8: return 0.08303976f;
      case 9: return -0.92642140f;
      case 10: node = (f[2] < -1.86658847f) ? 11 : 14; break;
      case 11: node = (f[10] < 2.23304415f) ? 12 : 13; break;
      case 12: return 0.58060300f;
      case 13: return -0.18693328f;
      case 14: node = (f[10] < 1.78935444f) ? 15 : 16; break;
      case 15: return -0.23645268f;
      case 16: return -0.80238181f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree77(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 0.73249793f) ? 1 : 10; break;
      case 1: node = (f[6] < -1.37229407f) ? 2 : 3; break;
      case 2: return 1.93097937f;
      case 3: node = (f[17] < -0.55515313f) ? 4 : 7; break;
      case 4: node = (f[2] < 0.69911832f) ? 5 : 6; break;
      case 5: return -0.11725116f;
      case 6: return -0.96677470f;
      case 7: node = (f[12] < 0.28563911f) ? 8 : 9; break;
      case 8: return -0.02131231f;
      case 9: return 0.41193628f;
      case 10: node = (f[10] < -1.07694244f) ? 11 : 12; break;
      case 11: return -3.01907849f;
      case 12: node = (f[17] < 3.39681435f) ? 13 : 16; break;
      case 13: node = (f[16] < 1.56165957f) ? 14 : 15; break;
      case 14: return -0.39695862f;
      case 15: return 1.00329244f;
      case 16: return 1.86436701f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree78(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[4] < -1.16838408f) ? 1 : 14; break;
      case 1: node = (f[19] < 0.24910720f) ? 2 : 9; break;
      case 2: node = (f[0] < 0.47626361f) ? 3 : 6; break;
      case 3: node = (f[18] < -0.39711383f) ? 4 : 5; break;
      case 4: return 1.69404936f;
      case 5: return 0.32665831f;
      case 6: node = (f[15] < -0.40031365f) ? 7 : 8; break;
      case 7: return 0.53319144f;
      case 8: return -0.39985582f;
      case 9: node = (f[16] < -0.10479434f) ? 10 : 13; break;
      case 10: node = (f[22] < -0.48235276f) ? 11 : 12; break;
      case 11: return 0.89968503f;
      case 12: return -0.48788238f;
      case 13: return 2.46407771f;
      case 14: node = (f[23] < -0.89624453f) ? 15 : 20; break;
      case 15: node = (f[19] < 2.54331064f) ? 16 : 19; break;
      case 16: node = (f[10] < -0.75598747f) ? 17 : 18; break;
      case 17: return 0.64419615f;
      case 18: return -0.26972553f;
      case 19: return 3.05692887f;
      case 20: node = (f[19] < 2.51857758f) ? 21 : 24; break;
      case 21: node = (f[23] < -0.75364482f) ? 22 : 23; break;
      case 22: return -0.96869540f;
      case 23: return -0.00650621f;
      case 24: return -3.18660831f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree79(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < -0.10637850f) ? 1 : 12; break;
      case 1: node = (f[8] < -0.44205454f) ? 2 : 5; break;
      case 2: node = (f[23] < 0.05233480f) ? 3 : 4; break;
      case 3: return 3.79486895f;
      case 4: return 0.47631878f;
      case 5: node = (f[16] < 1.15037405f) ? 6 : 9; break;
      case 6: node = (f[2] < -3.11949372f) ? 7 : 8; break;
      case 7: return 1.18897951f;
      case 8: return -0.08069803f;
      case 9: node = (f[3] < -0.41060087f) ? 10 : 11; break;
      case 10: return 1.37435651f;
      case 11: return -0.47242594f;
      case 12: node = (f[8] < 1.75073540f) ? 13 : 20; break;
      case 13: node = (f[15] < 0.53510761f) ? 14 : 17; break;
      case 14: node = (f[2] < 0.92531121f) ? 15 : 16; break;
      case 15: return 0.05683855f;
      case 16: return -0.66368598f;
      case 17: node = (f[14] < -0.00803422f) ? 18 : 19; break;
      case 18: return 0.02471143f;
      case 19: return -1.74343395f;
      case 20: return -1.53056252f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree80(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < 1.43987799f) ? 1 : 14; break;
      case 1: node = (f[19] < 0.94771415f) ? 2 : 9; break;
      case 2: node = (f[0] < -0.37006348f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.93675280f) ? 4 : 5; break;
      case 4: return 0.28469011f;
      case 5: return -0.87543189f;
      case 6: node = (f[11] < 1.93093085f) ? 7 : 8; break;
      case 7: return -0.15195024f;
      case 8: return 1.22117341f;
      case 9: node = (f[7] < -1.32207322f) ? 10 : 11; break;
      case 10: return -2.48134542f;
      case 11: node = (f[1] < -0.07257626f) ? 12 : 13; break;
      case 12: return -0.87572706f;
      case 13: return 1.78302145f;
      case 14: node = (f[9] < -0.67245555f) ? 15 : 16; break;
      case 15: return -2.50525641f;
      case 16: node = (f[0] < 0.27515620f) ? 17 : 18; break;
      case 17: return -1.97030294f;
      case 18: node = (f[12] < -0.79435277f) ? 19 : 20; break;
      case 19: return 1.71839643f;
      case 20: return -0.24054182f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree81(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[6] < -1.37229407f) ? 1 : 2; break;
      case 1: return 1.70346177f;
      case 2: node = (f[0] < 1.12148333f) ? 3 : 10; break;
      case 3: node = (f[0] < 0.44274571f) ? 4 : 7; break;
      case 4: node = (f[3] < 0.31885391f) ? 5 : 6; break;
      case 5: return 0.21354482f;
      case 6: return -0.16004309f;
      case 7: node = (f[19] < 2.51136065f) ? 8 : 9; break;
      case 8: return -0.25209773f;
      case 9: return -1.35686445f;
      case 10: node = (f[19] < 0.78760225f) ? 11 : 14; break;
      case 11: node = (f[5] < -0.04881268f) ? 12 : 13; break;
      case 12: return 2.68386841f;
      case 13: return -0.06487697f;
      case 14: node = (f[15] < 0.26106420f) ? 15 : 16; break;
      case 15: return 2.83867788f;
      case 16: return 0.03912128f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree82(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[5] < 1.48513150f) ? 1 : 12; break;
      case 1: node = (f[5] < 1.43987799f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.23273338f) ? 3 : 6; break;
      case 3: node = (f[15] < 2.42355776f) ? 4 : 5; break;
      case 4: return -0.06835583f;
      case 5: return 1.21770000f;
      case 6: node = (f[7] < -1.32207322f) ? 7 : 8; break;
      case 7: return -1.46980155f;
      case 8: return 0.57325059f;
      case 9: node = (f[19] < 0.19259664f) ? 10 : 11; break;
      case 10: return -0.16215250f;
      case 11: return -1.95573950f;
      case 12: node = (f[11] < -0.07961614f) ? 13 : 14; break;
      case 13: return -0.14929451f;
      case 14: node = (f[1] < 0.60120827f) ? 15 : 16; break;
      case 15: return 0.51910317f;
      case 16: return 2.53078604f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree83(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[12] < 0.33511230f) ? 1 : 16; break;
      case 1: node = (f[17] < -0.36660504f) ? 2 : 9; break;
      case 2: node = (f[17] < -0.78392476f) ? 3 : 6; break;
      case 3: node = (f[6] < 0.43451872f) ? 4 : 5; break;
      case 4: return 0.64979422f;
      case 5: return -0.40692580f;
      case 6: node = (f[19] < 0.13517550f) ? 7 : 8; break;
      case 7: return -0.27476999f;
      case 8: return -1.70561278f;
      case 9: node = (f[4] < 1.22896039f) ? 10 : 13; break;
      case 10: node = (f[17] < 1.07466388f) ? 11 : 12; break;
      case 11: return -0.00333801f;
      case 12: return -0.58749175f;
      case 13: node = (f[8] < 0.53170216f) ? 14 : 15; break;
      case 14: return 1.66574693f;
      case 15: return -0.06543490f;
      case 16: node = (f[19] < 0.24910720f) ? 17 : 24; break;
      case 17: node = (f[8] < 1.32080626f) ? 18 : 21; break;
      case 18: node = (f[11] < 0.86274034f) ? 19 : 20; break;
      case 19: return 0.18584764f;
      case 20: return -0.78649503f;
      case 21: node = (f[11] < 0.65324575f) ? 22 : 23; break;
      case 22: return 0.20868939f;
      case 23: return 1.74654329f;
      case 24: node = (f[4] < 1.48229504f) ? 25 : 28; break;
      case 25: node = (f[8] < -0.80030268f) ? 26 : 27; break;
      case 26: return 3.55725694f;
      case 27: return 0.93941075f;
      case 28: return -1.24597073f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree84(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[3] < 0.95578635f) ? 1 : 10; break;
      case 1: node = (f[6] < -1.34829187f) ? 2 : 3; break;
      case 2: return 1.73344088f;
      case 3: node = (f[11] < 0.16113110f) ? 4 : 7; break;
      case 4: node = (f[8] < 0.42113176f) ? 5 : 6; break;
      case 5: return 0.28267217f;
      case 6: return -0.22174127f;
      case 7: node = (f[3] < 0.40894270f) ? 8 : 9; break;
      case 8: return 0.03266546f;
      case 9: return -0.97461671f;
      case 10: node = (f[1] < 0.53123295f) ? 11 : 14; break;
      case 11: node = (f[1] < 0.22239895f) ? 12 : 13; break;
      case 12: return -0.80888861f;
      case 13: return 0.33692610f;
      case 14: node = (f[7] < 0.63500559f) ? 15 : 16; break;
      case 15: return -1.22925556f;
      case 16: return -0.36275837f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree85(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 2.54331064f) ? 1 : 10; break;
      case 1: node = (f[19] < 2.51857758f) ? 2 : 9; break;
      case 2: node = (f[10] < -0.89671171f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.25716648f) ? 4 : 5; break;
      case 4: return 2.40406132f;
      case 5: return 0.23622839f;
      case 6: node = (f[3] < -0.13999015f) ? 7 : 8; break;
      case 7: return 0.19089735f;
      case 8: return -0.21295534f;
      case 9: return -2.06345201f;
      case 10: node = (f[5] < 1.22216821f) ? 11 : 12; break;
      case 11: return -1.17320716f;
      case 12: node = (f[5] < 1.42281199f) ? 13 : 14; break;
      case 13: return 3.82318544f;
      case 14: return -0.16477427f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree86(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < -0.61863309f) ? 1 : 16; break;
      case 1: node = (f[1] < -0.22523892f) ? 2 : 9; break;
      case 2: node = (f[2] < 0.19329706f) ? 3 : 6; break;
      case 3: node = (f[10] < 0.02433362f) ? 4 : 5; break;
      case 4: return 1.34835064f;
      case 5: return 0.15315729f;
      case 6: node = (f[19] < -0.68652189f) ? 7 : 8; break;
      case 7: return 0.03499962f;
      case 8: return -0.88764715f;
      case 9: node = (f[6] < -1.02238798f) ? 10 : 13; break;
      case 10: node = (f[16] < 0.71461225f) ? 11 : 12; break;
      case 11: return -0.41074529f;
      case 12: return 1.06090569f;
      case 13: node = (f[12] < 0.85277706f) ? 14 : 15; break;
      case 14: return -0.50282282f;
      case 15: return -1.62511623f;
      case 16: node = (f[6] < -0.80633605f) ? 17 : 24; break;
      case 17: node = (f[3] < 0.36977571f) ? 18 : 21; break;
      case 18: node = (f[16] < 0.69459069f) ? 19 : 20; break;
      case 19: return 2.21601844f;
      case 20: return 0.47751194f;
      case 21: node = (f[7] < 0.53113091f) ? 22 : 23; break;
      case 22: return 0.33224472f;
      case 23: return -0.41742057f;
      case 24: node = (f[10] < -0.95814562f) ? 25 : 26; break;
      case 25: return -1.85219753f;
      case 26: node = (f[2] < -1.86658847f) ? 27 : 28; break;
      case 27: return 0.57260787f;
      case 28: return -0.03696515f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree87(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[17] < -0.30626968f) ? 1 : 12; break;
      case 1: node = (f[2] < -1.24193203f) ? 2 : 7; break;
      case 2: node = (f[21] < 0.00000000f) ? 3 : 4; break;
      case 3: return -0.19574748f;
      case 4: node = (f[19] < 0.17654921f) ? 5 : 6; break;
      case 5: return 1.30973220f;
      case 6: return 0.36345607f;
      case 7: node = (f[19] < 2.57672906f) ? 8 : 11; break;
      case 8: node = (f[5] < 1.39266837f) ? 9 : 10; break;
      case 9: return -0.27648154f;
      case 10: return -1.31397867f;
      case 11: return 1.40777373f;
      case 12: node = (f[0] < 1.15500116f) ? 13 : 20; break;
      case 13: node = (f[1] < 1.01817191f) ? 14 : 17; break;
      case 14: node = (f[4] < 1.22896039f) ? 15 : 16; break;
      case 15: return -0.02728245f;
      case 16: return 0.63338375f;
      case 17: node = (f[22] < 0.30484399f) ? 18 : 19; break;
      case 18: return -0.07562716f;
      case 19: return -1.27535021f;
      case 20: node = (f[1] < 1.24271846f) ? 21 : 24; break;
      case 21: node = (f[6] < -0.77829146f) ? 22 : 23; break;
      case 22: return 2.62473679f;
      case 23: return 0.65377331f;
      case 24: node = (f[5] < 1.02578688f) ? 25 : 26; break;
      case 25: return -0.64973754f;
      case 26: return 1.39231884f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree88(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -0.81320590f) ? 1 : 16; break;
      case 1: node = (f[4] < 0.82082617f) ? 2 : 9; break;
      case 2: node = (f[11] < 0.72587711f) ? 3 : 6; break;
      case 3: node = (f[11] < 0.61865938f) ? 4 : 5; break;
      case 4: return 0.11037181f;
      case 5: return 2.29601455f;
      case 6: node = (f[10] < -1.03401268f) ? 7 : 8; break;
      case 7: return -2.41794753f;
      case 8: return 0.09594482f;
      case 9: node = (f[10] < -1.02879667f) ? 10 : 13; break;
      case 10: node = (f[19] < 0.00415259f) ? 11 : 12; break;
      case 11: return 0.63464689f;
      case 12: return -0.81780189f;
      case 13: node = (f[19] < -0.36820236f) ? 14 : 15; break;
      case 14: return 0.67984587f;
      case 15: return 3.22281599f;
      case 16: node = (f[19] < 2.54331064f) ? 17 : 24; break;
      case 17: node = (f[8] < -0.82425958f) ? 18 : 21; break;
      case 18: node = (f[5] < 0.75668442f) ? 19 : 20; break;
      case 19: return -0.44044346f;
      case 20: return -1.84880686f;
      case 21: node = (f[0] < -0.53765303f) ? 22 : 23; break;
      case 22: return 0.17717616f;
      case 23: return -0.17488098f;
      case 24: node = (f[16] < -1.09494174f) ? 25 : 26; break;
      case 25: return -0.29381916f;
      case 26: return 2.56461692f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree89(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < -1.37213218f) ? 1 : 8; break;
      case 1: node = (f[15] < -0.89605415f) ? 2 : 7; break;
      case 2: node = (f[18] < -0.55677706f) ? 3 : 4; break;
      case 3: return 0.15993403f;
      case 4: node = (f[2] < 0.84737861f) ? 5 : 6; break;
      case 5: return -1.14913011f;
      case 6: return -0.43097046f;
      case 7: return 0.18690030f;
      case 8: node = (f[11] < 0.22279365f) ? 9 : 16; break;
      case 9: node = (f[2] < 0.80818367f) ? 10 : 13; break;
      case 10: node = (f[10] < -0.41460246f) ? 11 : 12; break;
      case 11: return 0.61344814f;
      case 12: return 0.05962978f;
      case 13: node = (f[15] < -0.87727481f) ? 14 : 15; break;
      case 14: return 0.07400589f;
      case 15: return -1.04623568f;
      case 16: node = (f[0] < -1.34208274f) ? 17 : 20; break;
      case 17: node = (f[18] < -0.24275500f) ? 18 : 19; break;
      case 18: return -0.12237638f;
      case 19: return 0.97060597f;
      case 20: node = (f[22] < 1.11743426f) ? 21 : 22; break;
      case 21: return -0.24696477f;
      case 22: return 0.67444533f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree90(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.15709533f) ? 1 : 14; break;
      case 1: node = (f[10] < -0.22066167f) ? 2 : 9; break;
      case 2: node = (f[4] < -0.64384502f) ? 3 : 6; break;
      case 3: node = (f[15] < 1.11268306f) ? 4 : 5; break;
      case 4: return 0.53943056f;
      case 5: return -1.26605392f;
      case 6: node = (f[2] < -0.48091456f) ? 7 : 8; break;
      case 7: return 3.15223360f;
      case 8: return 1.19397759f;
      case 9: node = (f[19] < 2.55331969f) ? 10 : 13; break;
      case 10: node = (f[2] < -1.22394180f) ? 11 : 12; break;
      case 11: return 0.38637924f;
      case 12: return -0.24898413f;
      case 13: return 1.85122168f;
      case 14: node = (f[15] < 0.73578453f) ? 15 : 22; break;
      case 15: node = (f[10] < -0.81320590f) ? 16 : 19; break;
      case 16: node = (f[5] < 0.72925883f) ? 17 : 18; break;
      case 17: return -0.17609304f;
      case 18: return 0.72566557f;
      case 19: node = (f[15] < 0.14739835f) ? 20 : 21; break;
      case 20: return -0.12642911f;
      case 21: return -0.91172826f;
      case 22: return -1.50716412f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree91(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[13] < 3.54314542f) ? 1 : 16; break;
      case 1: node = (f[5] < 1.43987799f) ? 2 : 9; break;
      case 2: node = (f[19] < 0.94771415f) ? 3 : 6; break;
      case 3: node = (f[3] < 0.30431846f) ? 4 : 5; break;
      case 4: return 0.11022934f;
      case 5: return -0.22700271f;
      case 6: node = (f[11] < 0.44651806f) ? 7 : 8; break;
      case 7: return 1.10430157f;
      case 8: return -1.01355195f;
      case 9: node = (f[23] < -1.43177450f) ? 10 : 13; break;
      case 10: node = (f[11] < -0.10094061f) ? 11 : 12; break;
      case 11: return -0.96763611f;
      case 12: return 0.60654867f;
      case 13: node = (f[2] < 0.27443457f) ? 14 : 15; break;
      case 14: return -2.86898136f;
      case 15: return -1.00540793f;
      case 16: node = (f[11] < -1.21034038f) ? 17 : 18; break;
      case 17: return -0.04216987f;
      case 18: node = (f[15] < 0.12832001f) ? 19 : 20; break;
      case 19: return 0.87176681f;
      case 20: return 1.75298500f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree92(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[1] < 1.28731847f) ? 1 : 16; break;
      case 1: node = (f[0] < 1.12148333f) ? 2 : 9; break;
      case 2: node = (f[6] < -1.19196236f) ? 3 : 6; break;
      case 3: node = (f[15] < 0.19196886f) ? 4 : 5; break;
      case 4: return 0.31874350f;
      case 5: return 2.16708899f;
      case 6: node = (f[0] < -0.48737615f) ? 7 : 8; break;
      case 7: return 0.15011875f;
      case 8: return -0.21967092f;
      case 9: node = (f[18] < -0.66809946f) ? 10 : 13; break;
      case 10: node = (f[0] < 1.27231383f) ? 11 : 12; break;
      case 11: return 1.16714370f;
      case 12: return 3.12051344f;
      case 13: node = (f[16] < 1.35356057f) ? 14 : 15; break;
      case 14: return -0.02708647f;
      case 15: return 1.45202875f;
      case 16: node = (f[15] < -0.32009724f) ? 17 : 22; break;
      case 17: node = (f[3] < 0.91465122f) ? 18 : 21; break;
      case 18: node = (f[0] < 1.33934975f) ? 19 : 20; break;
      case 19: return 1.33657742f;
      case 20: return -0.02499217f;
      case 21: return -1.13839221f;
      case 22: node = (f[2] < 0.67358148f) ? 23 : 26; break;
      case 23: node = (f[6] < -0.91855454f) ? 24 : 25; break;
      case 24: return 0.48002258f;
      case 25: return -1.02688992f;
      case 26: return -2.71926880f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree93(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[0] < -0.38682243f) ? 1 : 14; break;
      case 1: node = (f[17] < 0.47054836f) ? 2 : 9; break;
      case 2: node = (f[14] < -1.06081903f) ? 3 : 6; break;
      case 3: node = (f[10] < -1.26229668f) ? 4 : 5; break;
      case 4: return 1.89269638f;
      case 5: return 0.40012240f;
      case 6: node = (f[9] < -1.13512897f) ? 7 : 8; break;
      case 7: return -1.23692012f;
      case 8: return 0.04546354f;
      case 9: node = (f[14] < -0.99499148f) ? 10 : 11; break;
      case 10: return -0.47456950f;
      case 11: node = (f[10] < -0.09372302f) ? 12 : 13; break;
      case 12: return 2.05803609f;
      case 13: return 0.57049125f;
      case 14: node = (f[0] < 1.15500116f) ? 15 : 22; break;
      case 15: node = (f[11] < 0.68773329f) ? 16 : 19; break;
      case 16: node = (f[9] < -1.31646776f) ? 17 : 18; break;
      case 17: return 0.87656689f;
      case 18: return -0.17347774f;
      case 19: node = (f[10] < -1.03401268f) ? 20 : 21; break;
      case 20: return -2.27878213f;
      case 21: return -0.28399315f;
      case 22: node = (f[5] < -0.01258498f) ? 23 : 26; break;
      case 23: node = (f[23] < -0.05821660f) ? 24 : 25; break;
      case 24: return 0.61967319f;
      case 25: return 2.84407544f;
      case 26: node = (f[19] < 0.61179745f) ? 27 : 28; break;
      case 27: return -0.10331267f;
      case 28: return 1.96610856f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree94(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[17] < 4.48787928f) ? 1 : 14; break;
      case 1: node = (f[11] < -1.26754797f) ? 2 : 9; break;
      case 2: node = (f[12] < 0.55300486f) ? 3 : 6; break;
      case 3: node = (f[19] < 0.35055137f) ? 4 : 5; break;
      case 4: return -0.95599753f;
      case 5: return 0.10691048f;
      case 6: node = (f[17] < -0.12777750f) ? 7 : 8; break;
      case 7: return -0.04874761f;
      case 8: return 0.70391142f;
      case 9: node = (f[19] < 2.55331969f) ? 10 : 13; break;
      case 10: node = (f[19] < 2.52329206f) ? 11 : 12; break;
      case 11: return 0.07166956f;
      case 12: return -1.16241467f;
      case 13: return 1.05467546f;
      case 14: return -1.40575373f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree95(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 2.55331969f) ? 1 : 14; break;
      case 1: node = (f[19] < 2.51544070f) ? 2 : 9; break;
      case 2: node = (f[12] < 0.33511230f) ? 3 : 6; break;
      case 3: node = (f[11] < 1.93093085f) ? 4 : 5; break;
      case 4: return -0.10137197f;
      case 5: return 1.44772506f;
      case 6: node = (f[19] < 2.30029607f) ? 7 : 8; break;
      case 7: return 0.17739744f;
      case 8: return 2.24092603f;
      case 9: node = (f[14] < 0.82665533f) ? 10 : 13; break;
      case 10: node = (f[12] < -0.89461893f) ? 11 : 12; break;
      case 11: return 0.80573815f;
      case 12: return -1.79036772f;
      case 13: return -2.07695103f;
      case 14: return 1.45395124f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree96(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[10] < -1.26229668f) ? 1 : 12; break;
      case 1: node = (f[3] < 0.70604658f) ? 2 : 5; break;
      case 2: node = (f[18] < -0.39711383f) ? 3 : 4; break;
      case 3: return 0.18228149f;
      case 4: return 2.67260337f;
      case 5: node = (f[14] < -0.71463174f) ? 6 : 9; break;
      case 6: node = (f[8] < -1.15228510f) ? 7 : 8; break;
      case 7: return 1.34629798f;
      case 8: return -0.60202068f;
      case 9: node = (f[4] < 0.24196452f) ? 10 : 11; break;
      case 10: return 0.23331228f;
      case 11: return -1.26852119f;
      case 12: node = (f[3] < 0.22209339f) ? 13 : 20; break;
      case 13: node = (f[10] < -0.22066167f) ? 14 : 17; break;
      case 14: node = (f[3] < -0.21775208f) ? 15 : 16; break;
      case 15: return 1.92842948f;
      case 16: return 0.27505028f;
      case 17: node = (f[19] < 2.54331064f) ? 18 : 19; break;
      case 18: return -0.08054741f;
      case 19: return 1.84452569f;
      case 20: node = (f[15] < 0.26106420f) ? 21 : 24; break;
      case 21: node = (f[15] < 0.18259589f) ? 22 : 23; break;
      case 22: return -0.15171631f;
      case 23: return 0.98101294f;
      case 24: node = (f[14] < -0.97213829f) ? 25 : 26; break;
      case 25: return 0.52946180f;
      case 26: return -1.28057742f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree97(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[11] < 0.73249793f) ? 1 : 10; break;
      case 1: node = (f[19] < 2.54331064f) ? 2 : 7; break;
      case 2: node = (f[19] < 2.52329206f) ? 3 : 6; break;
      case 3: node = (f[19] < 2.50325537f) ? 4 : 5; break;
      case 4: return 0.02947016f;
      case 5: return 1.25983524f;
      case 6: return -1.49482346f;
      case 7: node = (f[12] < -1.48590744f) ? 8 : 9; break;
      case 8: return 0.32291347f;
      case 9: return 1.88464773f;
      case 10: node = (f[10] < -1.03401268f) ? 11 : 12; break;
      case 11: return -1.82614005f;
      case 12: node = (f[18] < -0.03279273f) ? 13 : 16; break;
      case 13: node = (f[16] < -0.16746214f) ? 14 : 15; break;
      case 14: return 0.30856568f;
      case 15: return -0.80641025f;
      case 16: node = (f[4] < -0.13718054f) ? 17 : 18; break;
      case 17: return 1.32813501f;
      case 18: return 0.04304465f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree98(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[2] < 0.59029013f) ? 1 : 14; break;
      case 1: node = (f[6] < -0.88830483f) ? 2 : 7; break;
      case 2: node = (f[2] < 0.30731127f) ? 3 : 4; break;
      case 3: return 2.36302924f;
      case 4: node = (f[23] < 0.24483903f) ? 5 : 6; break;
      case 5: return 1.12167442f;
      case 6: return -0.37435618f;
      case 7: node = (f[11] < 0.21123192f) ? 8 : 11; break;
      case 8: node = (f[6] < 0.14014859f) ? 9 : 10; break;
      case 9: return 0.44421661f;
      case 10: return -0.08596008f;
      case 11: node = (f[19] < 2.24660516f) ? 12 : 13; break;
      case 12: return -0.10535157f;
      case 13: return -1.28201616f;
      case 14: node = (f[15] < -0.26511404f) ? 15 : 20; break;
      case 15: node = (f[23] < -1.98503554f) ? 16 : 17; break;
      case 16: return -1.58481336f;
      case 17: node = (f[19] < 2.51857758f) ? 18 : 19; break;
      case 18: return -0.02608662f;
      case 19: return -1.13789546f;
      case 20: node = (f[6] < -1.03271234f) ? 21 : 24; break;
      case 21: node = (f[9] < -1.21086693f) ? 22 : 23; break;
      case 22: return -1.77420783f;
      case 23: return 0.84703499f;
      case 24: node = (f[15] < -0.05629708f) ? 25 : 26; break;
      case 25: return -2.19987583f;
      case 26: return -0.93442696f;
      default: return 0.0f;
    }
  }
}

static inline float range_tree99(const float *f) {
  int node = 0;
  while (1) {
    switch (node) {
      case 0: node = (f[19] < 2.54331064f) ? 1 : 16; break;
      case 1: node = (f[10] < -0.81320590f) ? 2 : 9; break;
      case 2: node = (f[3] < 0.30431846f) ? 3 : 6; break;
      case 3: node = (f[6] < -0.80633605f) ? 4 : 5; break;
      case 4: return 2.48235130f;
      case 5: return 0.04742884f;
      case 6: node = (f[15] < -0.26511404f) ? 7 : 8; break;
      case 7: return 0.39060199f;
      case 8: return -0.31389022f;
      case 9: node = (f[1] < -0.40219203f) ? 10 : 13; break;
      case 10: node = (f[10] < 0.02433362f) ? 11 : 12; break;
      case 11: return 0.46607664f;
      case 12: return -0.04869656f;
      case 13: node = (f[19] < 2.30029607f) ? 14 : 15; break;
      case 14: return -0.11963791f;
      case 15: return -0.91461843f;
      case 16: node = (f[14] < 0.82665533f) ? 17 : 20; break;
      case 17: node = (f[3] < 0.38532636f) ? 18 : 19; break;
      case 18: return 2.83490491f;
      case 19: return 0.83488971f;
      case 20: return -0.64462757f;
      default: return 0.0f;
    }
  }
}

static inline float range_predict(const float raw_features[24]) {
  float scaled[24];
  for (int i = 0; i < 24; i++) {
    scaled[i] = (raw_features[i] - range_scaler_mean[i]) / range_scaler_scale[i];
  }
  float sum = RANGE_BASE_SCORE;
  sum += range_tree0(scaled);
  sum += range_tree1(scaled);
  sum += range_tree2(scaled);
  sum += range_tree3(scaled);
  sum += range_tree4(scaled);
  sum += range_tree5(scaled);
  sum += range_tree6(scaled);
  sum += range_tree7(scaled);
  sum += range_tree8(scaled);
  sum += range_tree9(scaled);
  sum += range_tree10(scaled);
  sum += range_tree11(scaled);
  sum += range_tree12(scaled);
  sum += range_tree13(scaled);
  sum += range_tree14(scaled);
  sum += range_tree15(scaled);
  sum += range_tree16(scaled);
  sum += range_tree17(scaled);
  sum += range_tree18(scaled);
  sum += range_tree19(scaled);
  sum += range_tree20(scaled);
  sum += range_tree21(scaled);
  sum += range_tree22(scaled);
  sum += range_tree23(scaled);
  sum += range_tree24(scaled);
  sum += range_tree25(scaled);
  sum += range_tree26(scaled);
  sum += range_tree27(scaled);
  sum += range_tree28(scaled);
  sum += range_tree29(scaled);
  sum += range_tree30(scaled);
  sum += range_tree31(scaled);
  sum += range_tree32(scaled);
  sum += range_tree33(scaled);
  sum += range_tree34(scaled);
  sum += range_tree35(scaled);
  sum += range_tree36(scaled);
  sum += range_tree37(scaled);
  sum += range_tree38(scaled);
  sum += range_tree39(scaled);
  sum += range_tree40(scaled);
  sum += range_tree41(scaled);
  sum += range_tree42(scaled);
  sum += range_tree43(scaled);
  sum += range_tree44(scaled);
  sum += range_tree45(scaled);
  sum += range_tree46(scaled);
  sum += range_tree47(scaled);
  sum += range_tree48(scaled);
  sum += range_tree49(scaled);
  sum += range_tree50(scaled);
  sum += range_tree51(scaled);
  sum += range_tree52(scaled);
  sum += range_tree53(scaled);
  sum += range_tree54(scaled);
  sum += range_tree55(scaled);
  sum += range_tree56(scaled);
  sum += range_tree57(scaled);
  sum += range_tree58(scaled);
  sum += range_tree59(scaled);
  sum += range_tree60(scaled);
  sum += range_tree61(scaled);
  sum += range_tree62(scaled);
  sum += range_tree63(scaled);
  sum += range_tree64(scaled);
  sum += range_tree65(scaled);
  sum += range_tree66(scaled);
  sum += range_tree67(scaled);
  sum += range_tree68(scaled);
  sum += range_tree69(scaled);
  sum += range_tree70(scaled);
  sum += range_tree71(scaled);
  sum += range_tree72(scaled);
  sum += range_tree73(scaled);
  sum += range_tree74(scaled);
  sum += range_tree75(scaled);
  sum += range_tree76(scaled);
  sum += range_tree77(scaled);
  sum += range_tree78(scaled);
  sum += range_tree79(scaled);
  sum += range_tree80(scaled);
  sum += range_tree81(scaled);
  sum += range_tree82(scaled);
  sum += range_tree83(scaled);
  sum += range_tree84(scaled);
  sum += range_tree85(scaled);
  sum += range_tree86(scaled);
  sum += range_tree87(scaled);
  sum += range_tree88(scaled);
  sum += range_tree89(scaled);
  sum += range_tree90(scaled);
  sum += range_tree91(scaled);
  sum += range_tree92(scaled);
  sum += range_tree93(scaled);
  sum += range_tree94(scaled);
  sum += range_tree95(scaled);
  sum += range_tree96(scaled);
  sum += range_tree97(scaled);
  sum += range_tree98(scaled);
  sum += range_tree99(scaled);
  return sum;
}

#endif // MODEL_RANGE_H