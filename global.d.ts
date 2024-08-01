import { number } from "yup"

export { }
declare global {
  namespace Response {
    type Result<T, E> = Ok<T> | Err<E>
    type Ok<T> = {
      data: T
      status: 200
    }
    type Err<E> = {
      data: E
      status: ErrorStatus
    }
    type ApiErrorValidation = {
      message: {
        [key: string]: string[]
      }
    }
    type ApiError = {
      message: string
    }
    type ErrorStatus = 400 | 401 | 442 | 404 | 500 | 503
  }

  namespace Form {
    type InputForm = {
      type?: inputType
      keyName: string
      value: string | number
      error: string
      label: string
      placeholder: string
      isRequired: boolean
      isPassword?: boolean
      options?: options[]
    }
    type options = {
      label: string
      value: string | number
    }
    type inputType =
      | 'text'
      | 'radio'
      | 'date'
      | 'select'
      | 'ip'
      | 'textArea'
      | 'plainText'
      | 'button'
  }

  namespace Api {
    namespace Request {
      type SignIn = {
        authentication_type: number
        temporary_password: number
        qr: string
      }
      type SignReset = {
        password: string
        current_password: string
      }
      type PasswordForget = {
        tokui_no: string
        mail: string
      }

      namespace Shohin {
        type List = {
          page: number
          per_page: number
          keyword: string
          web_bunrui_cd: string
          maker: string
          sort: string
          order: 'ASC' | 'DESC'
          refine: ListRefine
          shohin_cd?: []
          favorite: boolean
        }
        type ListRefine = {
          web_bunrui_cd: string[]
          //zaiko_status: string[]
          kikaku1: string[]
          kikaku2: string[]
        }
        type Refine = {
          keyword: string
          web_bunrui_cd: string
          maker: string
          favorite: boolean
        }
        type Tanka = {
          shohin_cd: string
          maker_cd: string | null
        }
        type Cart = {
          cart: Tanka[]
        }
      }
      namespace Favorite {
        type Add = {
          shohin_cd: string
          maker_cd: string | null
        }
        type Delete = {
          shohin_cd: string
          maker_cd: string | null
        }
      }
      type OrderDetail = {
        num: number
        data: Cart.Item[]
      }
      type OrderRequest = {
        cart: Cart.Item[]
        orderRequest: Items[]
        address: Address.List
      }
      type Items = {
        tanto_nm?: string
        cyumon_biko?: string
        haiso_kbn?: number
      }
      namespace Address {
        type List = {
          category: ListItem[]
        }
        type ListItem = {
          genba_nm: string
          haiso_nm: string
          haiso_bumon_nm: string
          haiso_tanto_nm: string
          haiso_zip: string
          haiso_adr1: string
          haiso_adr2: string
          haiso_tel: string
        }
      }
      namespace User {
        type List = {
          mail: string
        }
      }
    }
    namespace Response {
      type Message = {
        message: string
      }
      type SignIn = {
        authentication_type: number
        temporary_password: number
        qr: string
      }
      namespace OrderRequestAddress {
        type List = {
          category: ListItem[]
        }
        type ListItem = {
          genba_nm: string
          haiso_nm: string
          haiso_bumon_nm: string
          haiso_tanto_nm: string
          haiso_zip: string
          haiso_adr1: string
          haiso_adr2: string
          haiso_tel: string
        }
      }
      type SignCheck = {
        id: number
        name: number
        tel: string
        department: string
        mail: string
        administrator: number
        kin_marume_kbn: number
      }
      namespace Category {
        type List = {
          category: ListItem[]
        }
        type ListItem = {
          web_bunrui_cd: string
          web_bunrui_nm: string
          children: Category.ListItem[]
        }
      }
      namespace Maker {
        type List = {
          maker: ListItem[]
        }
        type ListItem = {
          maker_cd: string
          maker_nm: string
        }
        namespace Nouhin {
          type List = {
            data: ListItem[]
            total: number
            total_page: number
          }
          type ListItem = {
            nouhin_seq_no: number
            nouhin_no: number
            tokui_no: number
            nouhin_ymd: string
            syukka_no: number
            syukka_ymd: string
            nouhin_kbn_nm: string
            cyumon_no: string
            cyumon_nm: string
            jyucyu_no: number
            tanto_nm: string
            cyumon_biko: string
            maker_nm: string
            shohin_cd: string
            shohin_nm: string
            kikaku1: string
            kikaku2: string
            suryo1: float
            suryo2: number
            tani_nm: string
            tanka: float
            kingaku: number
            meisai_biko1
            meisai_biko2: string
            genba_nm: string
            bukken_cd: string
            bukken_nm: string
            haiso_nm: string
            haiso_bumon_nm: string
            haiso_tanto_nm: string
            haiso_zip: string
            haiso_adr1: string
            haiso_adr2: string
            haiso_tel: string
          }
        }
        namespace Shohin {
          type List = {
            data: ListItem[]
            total: number
            total_page: number
          }
          type ListItem = {
            web_bunrui_nm: string
            maker: ListMaker[]
            shohin_cd: string
            shohin_nm: string
            kikaku1: string
            kikaku2: string
            image: string
            suryo1_input_kbn: number
            snp: number
            suryo_decimal_kbn: number
            maker_cd: string
            maker_nm: string
            web_bunrui_cd: string
            web_bunrui_nm: string
            tani_nm: string
            maker_sum_kbn: number
            bunrui_cd: string
            tokune_kbn: string
            makerbd_cd: string
            sptanka1: string
            spymd: string
            sptanka2: string
            nettanka1: string
            netymd: string
            nettanka2: string
            netsptanka1: string
            netspymd: string
            netsptanka2: string
            lptanka1: string
            lpymd: string
            lptanka2: string
            favorite: number
            zaiko_status: string
            tanka: number
          }
          type ListMaker = {
            maker_cd: string
            maker_nm: string
            shokuchi_kbn: number
            zaiko_status: string
          }
          type Refine = {
            web_bunrui_cd: RefineItem[]
            kikaku1: RefineItem[]
            kikaku2: RefineItem[]
            zaiko_status: RefineItem[]
          }
          type RefineItem = {
            name: string
            code: string
          }
          type Tanka = {
            shohin: ListItem
          }
        }
        namespace Order {
          type Conditions = {
            keyword: string
            cyumon_no: string
            cyumon_nm: string
            jyucyu_ymd_from: string
            jyucyu_ymd_to: string
            nouki_ymd1_from: string
            nouki_ymd1_to: string
            web: boolean
            nonWeb: boolean
            shipped: boolean
            unshipped: boolean
            page: number
          }
          type Top = {
            order: TopItem[]
          }
          type TopItem = {
            id: number
            tokui_no: string
            user_id: number
            user_name: string
            status: number
            ordered_at: number
            haiso_kbn: number
            cyumon_biko: string
            tanto_nm: string
            requested_at: number
            responsed_at: number
          }
          type List = {
            data: ListItem[]
            total: number
            lastPage: number
          }
          type ListItem = {
            jyucyu_seq_no: number
            cyumon_no: string
            maker_nm: string
            shohin_cd: string
            shohin_nm: string
            suryo1: string
            suryo2: string
            tani_nm: string
            tanka: string
            kingaku: string
            shippings_count: number
            kibou_nouki_ymd_max: string
            nouki_ymd1_max: string
            nouki_ymd1_min: string
            nouki_ymd2_max: string
            syukka_ymd_max: string
            pre_maker_nm: string
            pre_shohin_cd: string
            pre_suryo1: string
            pre_suryo2: string
            total: string
            kin_marume_kbn: number
          }
          type Detail = {
            order: OrderItem
            shippings: ShippingItem[] | null
            detail: DetailItem | null
            address: AddressItem | null
            kin_marume_kbn: number
            is_changed: boolean
            is_divided: boolean
          }
          type OrderItem = {
            jyucyu_seq_no: number
            tokui_no: number
            order_request_detail_id: number
            deleted: number
            jyucyu_ymd: string
            cyumon_no: string
            cyumon_nm: string
            jyucyu_no: number
            tanto_nm: string
            cyumon_biko: string
            maker_nm: string
            shohin_cd: string
            shohin_nm: string
            kikaku1: string
            kikaku2: string
            suryo1: string
            suryo2: string
            tani_nm: string
            tanka: string
            kingaku: string
            kibou_tanka: string
            meisai_biko1: string
            meisai_biko2: string
            nifuda_tekiyo: string
            genba_nm: string
            bukken_cd: string
            bukken_nm: string
            haiso_nm: string
            haiso_bumon_nm: string
            haiso_tanto_nm: string
            haiso_zip: string
            haiso_adr1: string
            haiso_adr2: string
            haiso_tel: string
            created_at: string
            updated_at: string
            kensaku_key: string
            total: string
          }
          type ShippingItem = {
            syukka_seq_no: number
            jyucyu_seq_no: number
            tokui_no: number
            order_request_detail_id: number
            deleted: number
            kibou_nouki_ymd: string
            nouki_kaito_nm: string
            nouki_ymd2: string
            nouki_ymd1: string
            haiso_kbn_nm: string
            chokuso_kbn_nm: string
            syukkabin_nm: string
            syukka_ymd: string
            syukka_no: string
            haiso_den_no: string
            syukka_suryo: string
            created_at: string
            updated_at: string
          }
          type DetailItem = {
            id: number
            order_request_id: number
            row_no: number
            shohin_nm: string
            maker_cd: string
            maker_nm: string
            shohin_cd: string
            kikaku1: string
            kikaku2: string
            tani_nm: string
            suryo1: string
            suryo2: string
            tanka: string
            kingaku: string
            kibou_tanka: string
            kibou_nouki_ymd: string
            nifuda_tekiyo: string
            cyumon_no: string
            created_at: string
            total: string
          }
          type AddressItem = {
            id: number
            order_request_id: number
            genba_nm: string
            haiso_nm: string
            haiso_bumon_nm: string
            haiso_tanto_nm: string
            haiso_zip: string
            haiso_adr1: string
            haiso_adr2: string
            haiso_tel: string
            created_at: string
          }
        }
      }
      namespace Shohin {
        type List = {
          data: ListItem[]
          total: number
          total_page: number
        }
        type ListItem = {
          web_bunrui_nm: string
          maker: ListMaker[]
          shohin_cd: string
          shohin_nm: string
          kikaku1: string
          kikaku2: string
          image: string
          suryo1_input_kbn: number
          suryo1_input_min: number
          suryo1_select1: number
          suryo1_select2: number
          suryo1_select3: number
          suryo1_select4: number
          suryo1_select5: number
          suryo1_select6: number
          snp: number
          suryo_decimal_kbn: number
          maker_cd: string
          maker_nm: string
          web_bunrui_cd: string
          web_bunrui_nm: string
          tani_nm: string
          maker_sum_kbn: number
          bunrui_cd: string
          tokune_kbn: string
          makerbd_cd: string
          sptanka1: string
          spymd: string
          sptanka2: string
          nettanka1: string
          netymd: string
          nettanka2: string
          netsptanka1: string
          netspymd: string
          netsptanka2: string
          lptanka1: string
          lpymd: string
          lptanka2: string
          favorite: number
          zaiko_status: string
          tanka: number
        }
        type ListMaker = {
          maker_cd: string
          maker_nm: string
          shokuchi_kbn: number
          zaiko_status: string
        }
        type Refine = {
          web_bunrui_cd: RefineItem[]
          kikaku1: RefineItem[]
          kikaku2: RefineItem[]
          zaiko_status: RefineItem[]
        }
        type RefineItem = {
          name: string
          code: string
        }
        type Tanka = {
          data: ListItem
        }
      }
      namespace Order {
        type Top = {
          order: TopItem[]
        }
        type TopItem = {
          id: number
          tokui_no: string
          user_id: number
          user_name: string
          status: number
          ordered_at: number
          haiso_kbn: number
          cyumon_biko: string
          tanto_nm: string
          requested_at: number
          responsed_at: number
        }
      }
      namespace Notice {
        type Top = {
          notice: TopItem[]
        }
        type TopItem = {
          title: string
          start_at: string
          end_at: string
          content: string
        }
      }
      namespace User {
        type List = {
          data: ListItem[]
          total: number
          total_page: number
        }
        type ListItem = {
          id: string
          name: string
          mail: string
          status: number
          last_logined_at: string
          password_expired_at: string
          remarks: string
        }
        type Detail = {
          data: DetailItem
        }
        type DetailItem = {
          id: number
          tokui_no: number
          mail: string
          name: string
          tel: string
          department: string
          status: number
          administrator: number
          last_logined_at: string
          password: string
          incorrect_count: number
          login_locked_at: string
          password_expired_at: string
          password_reset_token: string
          temporary_password: number
          google_authentication: string
          mail_authentication: number
          mail_auth_expired_at: string
          notification: number
        }
      }
      namespace Ip {
        type List = {
          data: ListItem[]
        }
        type ListItem = {
          id: number
          tokui_no: number
          ip_address: string
          status: number
          remarks: string
          created_at: string
        }
        type Detail = {
          data: DetailItem[]
        }
        type DetailItem = {
          id: number
          tokui_no: number
          ip_address: string
          status: number
          remarks: string
          created_at: string
        }
      }

      namespace AuthType {
        type Get = {
          authentication_type: number
        }
      }

      namespace CsvImport {
        type List = {
          data: ListItem[]
        }
        type ListItem = {
          line_no: number
          validation_result: boolean
          validation_error: string
          cart_item: Cart.Item
        }
      }
    }
  }
  namespace Cart {
    type Item = {
      maker_cd: string | null
      maker_nm: string
      shohin_cd: string
      shohin_nm: string
      kikaku1: string
      kikaku2: string
      suryo1: number
      tani_nm: string
      suryo2: number
      tanka: number
      kingaku: number
      kibou_tanka: number | null
      kibou_nouki_ymd: string
      cyumon_no: string
      nifuda_tekiyo: string
      tanto_nm: string
      maker_sum_kbn: number
      suryo1_input_kbn: number
    }
  }

  namespace Nouhin {
    type Item = {
      nouhin_kbn_nm: number
      cyumon_no: string
      maker_nm: string
      shohin_cd: string
      shohin_nm: string
      suryo1: float
      tani_nm: string
      suryo2: number
      tanka: float
      kingaku: number
      nouhin_ymd: string
      nouhin_no: number
    }
    type Search = {
      keyword: string
      cyumon_nm: string
      nouhin_ymd: string
    }
  }

  namespace Address {
    type Item = {
      genba_nm: string
      haiso_nm: string
      haiso_bumon_nm: string
      haiso_tanto_nm: string
      haiso_zip: string
      haiso_adr1: string
      haiso_adr2: string
      haiso_tel: string
    }
  }

  namespace OrderRequest {
    type Item = {
      haiso_kbn?: number
      cyumon_biko?: string
      tanto_nm?: string
    }
  }

  // namespace OrderRequestDetail {
  //   type Item = {
  //     kingaku: number
  //   }
  // }
  namespace Table {
    type Head = {
      name: string
      keyName: string
      type: ColumnType
      buttonName?: string
      convertFunction?: (row: any) => string
    }
    export type ColumnType = 'text' | 'button' | 'convert'
  }
}
