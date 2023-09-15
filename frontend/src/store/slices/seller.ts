import { SellerClient } from '@/shared/apis/sellerClient'
import {
	TypeAddressData,
	TypeSellerInfoData,
} from '@/shared/lib/types/sellerTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const sellerClient = new SellerClient()

type SellerSliceState = {
	seller: TypeSellerInfoData | null
	branches: TypeAddressData[] | null
	categories: any[]
	error: any
	productDetailsMaterialChoice: []
	productDetailsChoice: []
	productDetailsSizeChoice: []
	product: any
}

export const fetchSeller = createAsyncThunk(
	'seller/get',
	async (_, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchSeller()
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

export const fetchProduct = createAsyncThunk(
	'seller/product/get',
	async (id: string, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchSellerProduct(id)
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

export const fetchProductDetailsSizeChoice = createAsyncThunk(
	'seller/fetchProductDetailsSizeChoice/get',
	async (_, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchProductDetailsSizeChoice()
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

export const fetchProductDetailsMaterialChoice = createAsyncThunk(
	'seller/fetchProductDetailsMaterialChoice/get',
	async (_, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchProductDetailsMaterialChoice()
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

export const fetchProductDetailsChoice = createAsyncThunk(
	'seller/fetchProductDetailsChoice/get',
	async (_, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchProductDetailsChoice()
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

export const fetchBranches = createAsyncThunk(
	'seller-branches/get',
	async (_, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchBranches()
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

export const fetchCategories = createAsyncThunk(
	'categories/get',
	async (_, { rejectWithValue }) => {
		try {
			const data = await sellerClient.fetchCategories()
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.status)
		}
	}
)

const initialState: SellerSliceState = {
	seller: null,
	branches: [],
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
	extraReducers: builder => {
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

		builder.addCase(fetchProductDetailsChoice.fulfilled, (state, action) => {
			state.productDetailsChoice = action?.payload
			state.error = false
		})
		builder.addCase(fetchProductDetailsChoice.rejected, (state, action) => {
			state.error = action.payload
		})
		builder.addCase(
			fetchProductDetailsMaterialChoice.fulfilled,
			(state, action) => {
				state.productDetailsMaterialChoice = action?.payload
				state.error = false
			}
		)
		builder.addCase(
			fetchProductDetailsMaterialChoice.rejected,
			(state, action) => {
				state.error = action.payload
			}
		)
		builder.addCase(
			fetchProductDetailsSizeChoice.fulfilled,
			(state, action) => {
				state.productDetailsSizeChoice = action?.payload
				state.error = false
			}
		)
		builder.addCase(fetchProductDetailsSizeChoice.rejected, (state, action) => {
			state.error = action.payload
		})
		builder.addCase(fetchBranches.fulfilled, (state, action) => {
			state.branches = action?.payload
			state.error = false
		})
		builder.addCase(fetchBranches.rejected, (state, action) => {
			state.error = action.payload
		})
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
const { reducer } = sellerSlice
// Export the reducer, either as a default or named export
export default reducer
