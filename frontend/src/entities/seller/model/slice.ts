import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category, Product, Shop } from '@/shared/api/gen'
import { $apiProductsApi, $apiSellersApi } from '@/shared/api'

type SellerSliceState = {
  seller: Shop | null
  categories: Category[]
  error: any
  productDetailsMaterialChoice: []
  productDetailsChoice: []
  productDetailsSizeChoice: []
  product: Product | null
}

export const fetchSeller = createAsyncThunk('seller/get', async (slug: string, { rejectWithValue }) => {
  try {
    const { data } = await $apiSellersApi.sellersSellerShopsRead(slug)
    return data
  } catch (error: any) {
    return rejectWithValue(error.response.status)
  }
})

export const fetchProduct = createAsyncThunk('seller/product/get', async (slug: string, { rejectWithValue }) => {
  try {
    const { data } = await $apiProductsApi.productsSellerProductsRead(slug)
    return data
  } catch (error: any) {
    return rejectWithValue(error.response.status)
  }
})

// export const fetchProductDetailsSizeChoice = createAsyncThunk(
//   'seller/fetchProductDetailsSizeChoice/get',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await sellerClient.fetchProductDetailsSizeChoice()
//       return data
//     } catch (error: any) {
//       return rejectWithValue(error.response.status)
//     }
//   },
// )

// export const fetchProductDetailsMaterialChoice = createAsyncThunk(
//   'seller/fetchProductDetailsMaterialChoice/get',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await sellerClient.fetchProductDetailsMaterialChoice()
//       return data
//     } catch (error: any) {
//       return rejectWithValue(error.response.status)
//     }
//   },
// )

// export const fetchProductDetailsChoice = createAsyncThunk(
//   'seller/fetchProductDetailsChoice/get',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await sellerClient.fetchProductDetailsChoice()
//       return data
//     } catch (error: any) {
//       return rejectWithValue(error.response.status)
//     }
//   },
// )
export const fetchCategories = createAsyncThunk('categories/get', async (_, { rejectWithValue }) => {
  try {
    const { data } = await $apiProductsApi.productsCategoriesList()
    return data
  } catch (error: any) {
    return rejectWithValue(error.response.status)
  }
})

const initialState: SellerSliceState = {
  seller: null,
  categories: [],
  error: null,
  productDetailsMaterialChoice: [],
  productDetailsChoice: [],
  productDetailsSizeChoice: [],
  product: null,
}

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeller.fulfilled, (state, action) => {
      state.seller = action?.payload
      state.error = false
    })
    builder.addCase(fetchSeller.rejected, (state, action) => {
      state.error = action.payload
    })

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action?.payload
      state.error = false
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.error = action.payload
    })

    // builder.addCase(fetchProductDetailsChoice.fulfilled, (state, action) => {
    //   state.productDetailsChoice = action?.payload
    //   state.error = false
    // })
    // builder.addCase(fetchProductDetailsChoice.rejected, (state, action) => {
    //   state.error = action.payload
    // })
    // builder.addCase(fetchProductDetailsMaterialChoice.fulfilled, (state, action) => {
    //   state.productDetailsMaterialChoice = action?.payload
    //   state.error = false
    // })
    // builder.addCase(fetchProductDetailsMaterialChoice.rejected, (state, action) => {
    //   state.error = action.payload
    // })
    // builder.addCase(fetchProductDetailsSizeChoice.fulfilled, (state, action) => {
    //   state.productDetailsSizeChoice = action?.payload
    //   state.error = false
    // })
    // builder.addCase(fetchProductDetailsSizeChoice.rejected, (state, action) => {
    //   state.error = action.payload
    // })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action?.payload
      state.error = false
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.payload
    })
  },
})

// Extract the action creators object and the reducer
export const { reducer } = sellerSlice
