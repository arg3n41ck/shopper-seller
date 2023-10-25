import ApiClient from '@/shared/api/apiClient'
import { TypeAddressData, TypeSellerInfoData } from '@/shared/lib/types/sellerTypes'

export class SellerClient {
  async fetchProductDetailsSizeChoice(): Promise<any> {
    try {
      const { data } = await ApiClient.get<any>('/sellers/product_details/product_details_size_choice/')
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchProductDetailsChoice(): Promise<any> {
    try {
      const { data } = await ApiClient.get<any>('/sellers/product_details/product_details_choice/')
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchProductDetailsMaterialChoice(): Promise<any> {
    try {
      const { data } = await ApiClient.get<any>('/sellers/product_details/product_details_material_choice/')
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchBranches(): Promise<any> {
    try {
      const { data } = await ApiClient.get<TypeAddressData[]>('/sellers/info/branches/')
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchSellerProducts(): Promise<any> {
    try {
      const { data } = await ApiClient.get<any>('/sellers/products/')
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchSellerProduct(id: string): Promise<any> {
    try {
      const { data } = await ApiClient.get<any>(`/sellers/products/products/${id}/`)
      return data
    } catch (error) {
      throw error
    }
  }

  async deleteSellerProductPreview(id: string): Promise<any> {
    try {
      const { data } = await ApiClient.delete(`/sellers/product_previews/${id}/`)
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchCategories(): Promise<any> {
    try {
      const { data } = await ApiClient.get<any>('/categories/categories/')
      return data
    } catch (error) {
      throw error
    }
  }

  async changeInfoSeller(body: TypeSellerInfoData): Promise<any> {
    try {
      const { data } = await ApiClient.put<any>('/sellers/info/', body)
      return data
    } catch (error) {
      throw error
    }
  }

  async createAddress(body: TypeAddressData): Promise<any> {
    try {
      const { data } = await ApiClient.post<any>('/sellers/info/branches/', body)
      return data
    } catch (error) {
      throw error
    }
  }

  async editAddress({ id, ...body }: TypeAddressData): Promise<any> {
    try {
      const { data } = await ApiClient.put<any>(`/sellers/info/branches/${id}`, body)
      return data
    } catch (error) {
      throw error
    }
  }

  async deleteAddress(id: string): Promise<any> {
    try {
      const { data } = await ApiClient.delete<any>(`/sellers/info/branches/${id}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async createProduct(body: any): Promise<any> {
    try {
      const { data } = await ApiClient.post<any>('/products/sellers_products/', body)
      return data
    } catch (error) {
      throw error
    }
  }

  async editProduct({ id, body }: any): Promise<any> {
    try {
      const { data } = await ApiClient.put<any>(`'/products/sellers_products/${id}/`, body)
      return data
    } catch (error) {
      throw error
    }
  }
}
