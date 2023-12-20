import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { openDB } from 'idb'
import { TypeProduct } from '@/shared/lib/types/sellerTypes'

interface ProductActions {
  setProductData: (data: Partial<TypeProduct>) => void
  resetProductData: () => void
}

export interface TypeImageFile {
  image:
    | {
        fileName?: string
        base64?: string
      }
    | File
    | string
}

async function initDB() {
  return openDB('MyDatabase', 1, {
    upgrade(db) {
      db.createObjectStore('zustand')
    },
  })
}

async function setInDB<T>(key: string, value: T) {
  const db = await initDB()
  const tx = db.transaction('zustand', 'readwrite')
  await tx.store.put(value, key)
  await tx.done
}

async function getFromDB(key: string) {
  const db = await initDB()
  return db.get('zustand', key)
}

async function removeFromDB(key: string) {
  const db = await initDB()
  const tx = db.transaction('zustand', 'readwrite')
  await tx.store.delete(key)
  await tx.done
}

const convertFileToDataURL = (file: File): Promise<{ base64: string; fileName: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ base64: reader.result as string, fileName: file.name })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export const useCreateProduct = create<TypeProduct & ProductActions>()(
  persist(
    devtools((set) => ({
      title: '',
      description: '',
      gender: '',
      for_kids: false,
      price_from: '',
      discount: '',
      country: '',
      category: '',
      tags: [],
      recommendation: '',
      specifications: [{ title: '', value: '' }],
      publishDate: '',
      variants: [],
      is_pre_order: false,
      pre_order_days: '',

      setProductData: async (data) => {
        const updatedData: Partial<TypeProduct> = { ...data }

        for (const variant of updatedData.variants ?? []) {
          for (let i = 0; i < variant.images.length; i++) {
            const image: TypeImageFile = variant.images[i]

            if (image.image instanceof File) {
              image.image = await convertFileToDataURL(image.image)
            }
          }
        }

        set((state) => ({ ...state, ...updatedData }))
      },

      resetProductData: () => {
        set(() => ({
          title: '',
          description: '',
          gender: '',
          for_kids: false,
          price_from: '',
          discount: '',
          country: '',
          category: '',
          tags: [],
          recommendation: '',
          specifications: [{ title: '', value: '' }],
          publish_date: '',
          variants: [],
          is_pre_order: false,
          pre_order_days: '',
        }))

        removeFromDB('create-product-storage')
      },
    })),

    {
      name: 'create-product-storage',
      getStorage: () => ({
        getItem: getFromDB,
        setItem: setInDB,
        removeItem: async (name) => {
          const db = await initDB()
          const tx = db.transaction('zustand', 'readwrite')
          await tx.store.delete(name)
          await tx.done
        },
      }),
    },
  ),
)
