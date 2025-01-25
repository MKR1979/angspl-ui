import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import OrderDTO, { ORDER } from '@/app/types/OrderDTO';
import { ADD_ORDER, UPDATE_ORDER, GET_ORDER, GET_ORDER_ITEM_LIST } from '@/app/graphql/Order';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { ACCOUNT_LOOKUP, GET_ACCOUNT } from '@/app/graphql/Account';
import { CONTACT_LOOKUP } from '@/app/graphql/Contact';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import dayjs from 'dayjs';
import { ContextMenuType, defaultPageSize, getLocalTime } from '@/app/common/Configuration';
import { GridEventListener, GridInitialState, GridRowSelectionModel, useGridApiRef } from '@mui/x-data-grid';
import OrderItemDTO, { ORDER_ITEM } from '@/app/types/OrderItemDTO';
import { GET_PRODUCT, GET_PRODUCT_PRICE, PRODUCT_LOOKUP } from '@/app/graphql/Product';
import { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import ProductDTO, { PRODUCT } from '@/app/types/ProductDTO';
import { CURRENCY_LOOKUP, GET_CURRENCY } from '@/app/graphql/Currency';
import CurrencyDTO, { CURRENCY } from '@/app/types/CurrencyDTO';
import { STATE_LOOKUP } from '@/app/graphql/state';
import AccountDTO, { ACCOUNT } from '@/app/types/AccountDTO';
import { GET_QUOTE, GET_QUOTE_ITEM_LIST, QUOTE_LOOKUP } from '@/app/graphql/Quote';
import QuoteDTO, { QUOTE } from '@/app/types/QuoteDTO';
import QuoteItemDTO from '@/app/types/QuoteItemDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import ProductPriceDTO, { PRODUCT_PRICE } from '@/app/types/ProductPriceDTO';
import TaxDTO, { TAX } from '@/app/types/TaxDTO';
import { GET_TAX, TAX_LOOKUP } from '@/app/graphql/Tax';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  order_date: string | null;
  customer_id: string | null;
  contact_id: string | null;
  currency_id: string | null;
  status: string | null;
  billing_address: string | null;
  billing_city_name: string | null;
  billing_state_id: string | null;
  billing_country_id: string | null;
  billing_zip_code: string | null;
  shipping_address: string | null;
  shipping_city_name: string | null;
  shipping_state_id: string | null;
  shipping_country_id: string | null;
  shipping_zip_code: string | null;
};
type ErrorMessageType1 = {
  product_id: string | null;
  qty: string | null;
  price: string | null;
  lead_time: string | null;
};

type visibleDialog1Type = { id: number; visibility: boolean };

type StateType = {
  dtoOrder: OrderDTO;
  items: OrderItemDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  open7: boolean;
  open8: boolean;
  open9: boolean;
  open10: boolean;
  open11: boolean;
  open12: boolean;
  open13: boolean;
  open14: boolean;
  open15: boolean;
  open16: boolean;
  open17: boolean;
  arrQuoteLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrProductLookup: LookupDTO[];
  initialState: GridInitialState;
  openPopup: boolean;
  dtoOrderItem: OrderItemDTO;
  arrSelectedId: number[];
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
  contextMenu: ContextMenuType | null;
  //selectedRow: number;
  tabIndex: number;
  item_no: number;
  arrBillingStateLookup: LookupDTO[];
  arrShippingStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  saveDisabled?: boolean;
  errorMessages: ErrorMessageType;
  errorMessages1: ErrorMessageType1;
};

type Props = {
  dtoOrder: OrderDTO;
  arrQuoteLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};

const useOrderEntry = ({
  dtoOrder,
  arrQuoteLookup,
  arrAccountLookup,
  arrUserLookup,
  arrIncotermLookup,
  arrTermLookup,
  arrCurrencyLookup,
  arrTaxLookup,
  arrCountryLookup
}: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    order_date: null,
    customer_id: null,
    contact_id: null,
    currency_id: null,
    status: null,
    billing_address: null,
    billing_city_name: null,
    billing_state_id: null,
    billing_country_id: null,
    billing_zip_code: null,
    shipping_address: null,
    shipping_city_name: null,
    shipping_state_id: null,
    shipping_country_id: null,
    shipping_zip_code: null
  } as ErrorMessageType);

  const ERROR_MESSAGES1: ErrorMessageType1 = Object.freeze({
    product_id: null,
    qty: null,
    price: null,
    lead_time: null
  } as ErrorMessageType1);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoOrder: dtoOrder,
    items: [] as OrderItemDTO[],
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    open8: false,
    open9: false,
    open10: false,
    open11: false,
    open12: false,
    open13: false,
    open14: false,
    open15: false,
    open16: false,
    open17: false,
    arrQuoteLookup: arrQuoteLookup,
    arrAccountLookup: arrAccountLookup,
    arrUserLookup: arrUserLookup,
    arrContactLookup: [],
    arrIncotermLookup: arrIncotermLookup,
    arrTermLookup: arrTermLookup,
    arrCurrencyLookup: arrCurrencyLookup,
    arrTaxLookup: arrTaxLookup,
    arrProductLookup: [] as LookupDTO[],
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    openPopup: false,
    dtoOrderItem: ORDER_ITEM,
    arrSelectedId: [] as number[],
    visibleDialog: false,
    visibleDialog1: { id: 0, visibility: false },
    contextMenu: null,
    //selectedRow: 0,
    tabIndex: 0,
    item_no: 0,
    arrBillingStateLookup: [],
    arrShippingStateLookup: [],
    arrCountryLookup: arrCountryLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES },
    errorMessages1: { ...ERROR_MESSAGES1 }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [addOrder] = useMutation(ADD_ORDER, {});

  const [updateOrder] = useMutation(UPDATE_ORDER, {});

  const [getOrder] = useLazyQuery(GET_ORDER, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getQuoteLookup] = useLazyQuery(QUOTE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getAccountLookup] = useLazyQuery(ACCOUNT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getContactLookup] = useLazyQuery(CONTACT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getIncotermLookup] = useLazyQuery(INCOTERM_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getTermLookup] = useLazyQuery(TERM_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrencyLookup] = useLazyQuery(CURRENCY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductLookup] = useLazyQuery(PRODUCT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getUserMyProfile] = useLazyQuery(GET_USER_MY_PROFILE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getOrderItemList] = useLazyQuery(GET_ORDER_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getProduct] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getProductPrice] = useLazyQuery(GET_PRODUCT_PRICE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getTax] = useLazyQuery(GET_TAX, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getTaxLookup] = useLazyQuery(TAX_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrency] = useLazyQuery(GET_CURRENCY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getQuote] = useLazyQuery(GET_QUOTE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccount] = useLazyQuery(GET_ACCOUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getQuoteItemList] = useLazyQuery(GET_QUOTE_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData1 = useCallback(async (): Promise<void> => {
    let arrUserLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup();
    if (!error && data?.getUserLookup) {
      arrUserLookup = data.getUserLookup;
    }
    setState({ arrUserLookup: arrUserLookup } as StateType);
  }, [getUserLookup]);

  const getData11 = useCallback(async (): Promise<void> => {
    let arrQuoteLookup: LookupDTO[] = [];
    const { error, data } = await getQuoteLookup({
      variables: {
        full: state.dtoOrder.id > 0
      }
    });
    if (!error && data?.getQuoteLookup) {
      arrQuoteLookup = data.getQuoteLookup;
    }
    setState({ arrQuoteLookup: arrQuoteLookup } as StateType);
  }, [getQuoteLookup, state.dtoOrder.id]);

  const getData2 = useCallback(async (): Promise<void> => {
    let arrAccountLookup: LookupDTO[] = [];
    const { error, data } = await getAccountLookup();
    if (!error && data?.getAccountLookup) {
      arrAccountLookup = data.getAccountLookup;
    }
    setState({ arrAccountLookup: arrAccountLookup } as StateType);
  }, [getAccountLookup]);

  const getData3 = useCallback(
    async (account_id: number): Promise<void> => {
      let arrContactLookup: LookupDTO[] = [];
      const { error, data } = await getContactLookup({
        variables: {
          account_id: account_id
        }
      });
      if (!error && data?.getContactLookup) {
        arrContactLookup = data.getContactLookup;
      }
      setState({ arrContactLookup: arrContactLookup } as StateType);
    },
    [getContactLookup]
  );
  const getQuoteData = useCallback(
    async (quote_id: number): Promise<void> => {
      let dtoQuote: QuoteDTO = QUOTE;
      const { error, data } = await getQuote({
        variables: {
          id: quote_id
        }
      });
      if (!error && data?.getQuote) {
        dtoQuote = data.getQuote;
      }
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          customer_id: dtoQuote.customer_id,
          customer_name: dtoQuote.customer_name,
          sales_person_id: dtoQuote.sales_person_id,
          sales_person_name: dtoQuote.sales_person_name,
          customer_ref_no: dtoQuote.customer_ref_no,
          incoterm_id: dtoQuote.incoterm_id,
          incoterm_description: dtoQuote.incoterm_description,
          term_id: dtoQuote.term_id,
          term_description: dtoQuote.term_description,
          currency_id: dtoQuote.currency_id,
          currency_name: dtoQuote.currency_name,
          currency_symbol: dtoQuote.currency_symbol,
          contact_id: dtoQuote.contact_id,
          contact_name: dtoQuote.contact_name,
          billing_address: dtoQuote.billing_address,
          billing_city_name: dtoQuote.billing_city_name,
          billing_state_id: dtoQuote.billing_state_id,
          billing_state_code: dtoQuote.billing_state_code,
          billing_state_name: dtoQuote.billing_state_name,
          billing_country_id: dtoQuote.billing_country_id,
          billing_country_name: dtoQuote.billing_country_name,
          billing_zip_code: dtoQuote.billing_zip_code,
          shipping_address: dtoQuote.shipping_address,
          shipping_city_name: dtoQuote.shipping_city_name,
          shipping_state_id: dtoQuote.shipping_state_id,
          shipping_state_code: dtoQuote.shipping_state_code,
          shipping_state_name: dtoQuote.shipping_state_name,
          shipping_country_id: dtoQuote.shipping_country_id,
          shipping_country_name: dtoQuote.shipping_country_name,
          shipping_zip_code: dtoQuote.shipping_zip_code,
          total_amount: dtoQuote.total_amount,
          discount_amount: dtoQuote.discount_amount,
          sub_total_amount: dtoQuote.sub_total_amount,
          shipping_charges: dtoQuote.shipping_charges,
          shipping_tax_id: dtoQuote.shipping_tax_id,
          shipping_tax_description: dtoQuote.shipping_tax_description,
          shipping_tax_amount: dtoQuote.shipping_tax_amount,
          grand_total_amount: dtoQuote.grand_total_amount
        }
      } as StateType);
    },
    [getQuote, state.dtoOrder]
  );

  const getAccountData = useCallback(
    async (account_id: number): Promise<void> => {
      let dtoAccount: AccountDTO = ACCOUNT;
      const { error, data } = await getAccount({
        variables: {
          id: account_id
        }
      });
      if (!error && data?.getAccount) {
        dtoAccount = data.getAccount;
      }
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          contact_id: 0,
          contact_name: '',
          billing_address: dtoAccount.billing_address,
          billing_city_name: dtoAccount.billing_city_name,
          billing_state_id: dtoAccount.billing_state_id,
          billing_state_code: dtoAccount.billing_state_code,
          billing_state_name: dtoAccount.billing_state_name,
          billing_country_id: dtoAccount.billing_country_id,
          billing_country_name: dtoAccount.billing_country_name,
          billing_zip_code: dtoAccount.billing_zip_code,
          shipping_address: dtoAccount.shipping_address,
          shipping_city_name: dtoAccount.shipping_city_name,
          shipping_state_id: dtoAccount.shipping_state_id,
          shipping_state_code: dtoAccount.shipping_state_code,
          shipping_state_name: dtoAccount.shipping_state_name,
          shipping_country_id: dtoAccount.shipping_country_id,
          shipping_country_name: dtoAccount.shipping_country_name,
          shipping_zip_code: dtoAccount.shipping_zip_code
        }
      } as StateType);
    },
    [getAccount, state.dtoOrder]
  );

  const getData4 = useCallback(async (): Promise<void> => {
    let arrIncotermLookup: LookupDTO[] = [];
    const { error, data } = await getIncotermLookup();
    if (!error && data?.getIncotermLookup) {
      arrIncotermLookup = data.getIncotermLookup;
    }
    setState({ arrIncotermLookup: arrIncotermLookup } as StateType);
  }, [getIncotermLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrTermLookup: LookupDTO[] = [];
    const { error, data } = await getTermLookup();
    if (!error && data?.getTermLookup) {
      arrTermLookup = data.getTermLookup;
    }
    setState({ arrTermLookup: arrTermLookup } as StateType);
  }, [getTermLookup]);

  const getData7 = useCallback(async (): Promise<void> => {
    let arrProductLookup: LookupDTO[] = [];
    const { error, data } = await getProductLookup();
    if (!error && data?.getProductLookup) {
      arrProductLookup = data.getProductLookup;
    }
    setState({ arrProductLookup: arrProductLookup } as StateType);
  }, [getProductLookup]);

  const getData8 = useCallback(async (): Promise<void> => {
    let arrCurrencyLookup: LookupDTO[] = [];
    const { error, data } = await getCurrencyLookup();
    if (!error && data?.getCurrencyLookup) {
      arrCurrencyLookup = data.getCurrencyLookup;
    }
    setState({ arrCurrencyLookup: arrCurrencyLookup } as StateType);
  }, [getCurrencyLookup]);

  const getData13 = useCallback(async (): Promise<void> => {
    let arrTaxLookup: LookupDTO[] = [];
    const { error, data } = await getTaxLookup();
    if (!error && data?.getTaxLookup) {
      arrTaxLookup = data.getTaxLookup;
    }
    setState({ arrTaxLookup: arrTaxLookup } as StateType);
  }, [getTaxLookup]);

  const getQuoteItems = useCallback(async (): Promise<void> => {
    let arrItems: QuoteItemDTO[] = [];
    const { error, data } = await getQuoteItemList({
      variables: {
        quote_id: state.dtoOrder.quote_id
      }
    });
    if (!error && data?.getQuoteItemList) {
      arrItems = [...data.getQuoteItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getQuoteItemList, state.dtoOrder.quote_id]);

  const getItems = useCallback(async (): Promise<void> => {
    let arrItems: OrderItemDTO[] = [];
    const { error, data } = await getOrderItemList({
      variables: {
        order_id: state.dtoOrder.id
      }
    });
    if (!error && data?.getOrderItemList) {
      arrItems = [...data.getOrderItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getOrderItemList, state.dtoOrder.id]);

  const getProductData = useCallback(
    async (product_id: number): Promise<ProductDTO> => {
      let dtoProduct: ProductDTO = PRODUCT;
      const { error, data } = await getProduct({
        variables: {
          id: product_id
        }
      });
      if (!error && data?.getProduct) {
        dtoProduct = data.getProduct;
      }
      return dtoProduct;
    },
    [getProduct]
  );

  const getProductPriceData = useCallback(
    async (product_id: number, currency_id: number): Promise<ProductPriceDTO> => {
      let dtoProductPrice: ProductPriceDTO = PRODUCT_PRICE;
      const { error, data } = await getProductPrice({
        variables: {
          product_id: product_id,
          currency_id: currency_id
        }
      });
      if (!error && data?.getProductPrice) {
        dtoProductPrice = data.getProductPrice;
      }
      return dtoProductPrice;
    },
    [getProductPrice]
  );
  const getTaxData = useCallback(
    async (tax_id: number): Promise<TaxDTO> => {
      let dtoTax: TaxDTO = TAX;
      const { error, data } = await getTax({
        variables: {
          id: tax_id
        }
      });
      if (!error && data?.getTax) {
        dtoTax = data.getTax;
      }
      return dtoTax;
    },
    [getTax]
  );
  const getCurrencyData = useCallback(
    async (currency_id: number): Promise<void> => {
      let dtoCurrency: CurrencyDTO = CURRENCY;
      const { error, data } = await getCurrency({
        variables: {
          id: currency_id
        }
      });
      if (!error && data?.getCurrency) {
        dtoCurrency = data.getCurrency;
      }
      setState({ dtoOrder: { ...state.dtoOrder, currency_symbol: dtoCurrency.currency_symbol } } as StateType);
    },
    [getCurrency, state.dtoOrder]
  );

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoOrder: OrderDTO = ORDER;
    const { error, data } = await getOrder({
      variables: {
        id: state.dtoOrder.id
      }
    });
    if (!error && data?.getOrder) {
      dtoOrder = data.getOrder;
    }
    setState({ dtoOrder: dtoOrder } as StateType);
  }, [getOrder, state.dtoOrder.id]);

  const getData12 = useCallback(async (): Promise<void> => {
    let arrCountryLookup: LookupDTO[] = [];
    const { error, data } = await getCountryLookup();
    if (!error && data?.getCountryLookup) {
      arrCountryLookup = data.getCountryLookup;
    }
    setState({ arrCountryLookup: arrCountryLookup } as StateType);
  }, [getCountryLookup]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoOrder: {
        ...dtoOrder,
        sales_person_id: dtoUser.id,
        sales_person_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoOrder]);

  useEffect(() => {
    getCurrencyData(state.dtoOrder.currency_id);
  }, [state.dtoOrder.currency_id]);

  useEffect(() => {
    if (state.dtoOrder.id > 0) {
      getData();
      getItems();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
    getData4();
    getData5();
    getData7();
    getData8();
    getData11();
    getData12();
    getData13();
  }, [
    state.dtoOrder.id,
    getData,
    getItems,
    getData1,
    getData2,
    getData4,
    getData5,
    getData7,
    getData8,
    getData11,
    getData12,
    getData13,
    setDefaultValues
  ]);

  useEffect(() => {
    let discount_amount = 0;
    discount_amount =
      state.dtoOrderItem.qty *
      (state.dtoOrderItem.discount_type === 'Fixed'
        ? state.dtoOrderItem.discount
        : (state.dtoOrderItem.price * state.dtoOrderItem.discount) / 100);
    setState({
      dtoOrderItem: {
        ...state.dtoOrderItem,
        discount_amount: discount_amount,
        amount: state.dtoOrderItem.qty * state.dtoOrderItem.price
      }
    } as StateType);
  }, [state.dtoOrderItem.qty, state.dtoOrderItem.price, state.dtoOrderItem.discount_type, state.dtoOrderItem.discount]);

  const calulateTaxAmount = useCallback(async () => {
    let amount = 0;
    let tax_amount = 0;
    amount = state.dtoOrderItem.amount - state.dtoOrderItem.discount_amount;
    const dtoTax: TaxDTO = await getTaxData(state.dtoOrderItem.tax_id);
    tax_amount = (amount * dtoTax.tax_percentage) / 100;
    setState({
      dtoOrderItem: {
        ...state.dtoOrderItem,
        tax_amount: tax_amount
      }
    } as StateType);
  }, [state.dtoOrderItem.amount, state.dtoOrderItem.discount_amount, state.dtoOrderItem.tax_id]);

  useEffect(() => {
    calulateTaxAmount();
  }, [state.dtoOrderItem.amount, state.dtoOrderItem.discount_amount, state.dtoOrderItem.tax_id]);

  const calculateTotal = useCallback(async () => {
    let total_amount = 0;
    let discount_amount = 0;
    let tax_amount = 0;
    let shipping_tax_amount = 0;
    let shipping_charges = 0;
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].deleted === false) {
        total_amount += state.items[i].qty * state.items[i].price;
        discount_amount += state.items[i].discount_amount;
        tax_amount += state.items[i].tax_amount;
      }
    }
    const dtoTax: TaxDTO = await getTaxData(state.dtoOrder.shipping_tax_id);

    shipping_tax_amount = (Number(state.dtoOrder.shipping_charges) * dtoTax.tax_percentage) / 100;
    shipping_charges = state.dtoOrder.shipping_charges;

    setState({
      dtoOrder: {
        ...state.dtoOrder,
        total_amount: total_amount,
        discount_amount: discount_amount,
        sub_total_amount: total_amount - discount_amount,
        tax_amount: tax_amount,
        shipping_tax_amount: shipping_tax_amount,
        grand_total_amount: total_amount - discount_amount + tax_amount + shipping_charges + shipping_tax_amount
      }
    } as StateType);
  }, [state.items, state.dtoOrder.shipping_charges, state.dtoOrder.shipping_tax_id]);

  useEffect(() => {
    calculateTotal();
  }, [state.items, state.dtoOrder.shipping_charges, state.dtoOrder.shipping_tax_id]);

  const onInputChange = useCallback(
    async (event: any) => {
      switch (event.target.name) {
        case 'shipping_charges':
          setState({
            dtoOrder: {
              ...state.dtoOrder,
              [event.target.name]: parseFloat(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoOrder: {
              ...state.dtoOrder,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoOrder]
  );

  const onInputChange1 = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'qty':
        case 'price':
        case 'discount':
          setState({
            dtoOrderItem: {
              ...state.dtoOrderItem,
              [event.target.name]: Number(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoOrderItem: {
              ...state.dtoOrderItem,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoOrderItem]
  );

  const onQuoteNoChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          quote_id: (value as LookupDTO).id,
          quote_no: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onCustomerNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          customer_id: (value as LookupDTO).id,
          customer_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onContactNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          contact_id: (value as LookupDTO).id,
          contact_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onIncotermChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          incoterm_id: (value as LookupDTO).id,
          incoterm_description: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onTermChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          term_id: (value as LookupDTO).id,
          term_description: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onCurrencyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, currency_id: (value as LookupDTO).id, currency_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, status: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onSalesPersonNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, sales_person_id: (value as LookupDTO).id, sales_person_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onOrderDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoOrder: { ...state.dtoOrder, order_date: value } } as StateType);
    },
    [state.dtoOrder]
  );

  const onDueDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoOrder: { ...state.dtoOrder, due_date: value } } as StateType);
    },
    [state.dtoOrder]
  );

  const onProductNameChange = useCallback(
    async (event: any, value: unknown) => {
      //const dtoProduct = await getProductData((value as LookupDTO).id as number);
      //const dtoProductPrice = await getProductPriceData((value as LookupDTO).id as number, state.dtoOrder.currency_id);
      setState({
        dtoOrderItem: {
          ...state.dtoOrderItem,
          product_id: (value as LookupDTO).id,
          product_name: (value as LookupDTO).text
          //part_number: dtoProduct.part_number,
          //unit_name: dtoProduct.unit_name,
          //price: dtoProductPrice.unit_price
        }
      } as StateType);
    },
    [state.dtoOrderItem]
  );

  const onDiscountTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrderItem: { ...state.dtoOrderItem, discount_type: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrderItem]
  );

  const onTaxChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrderItem: { ...state.dtoOrderItem, tax_id: (value as LookupDTO).id, tax_description: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrderItem]
  );
  const onTax1Change = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, shipping_tax_id: (value as LookupDTO).id, shipping_tax_description: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );
  const onLeadTimeChange = useCallback(
    async (
      event: SyntheticEvent<Element, Event>,
      value: unknown,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<unknown> | undefined
    ): Promise<void> => {
      console.log(event, reason, details);
      setState({
        dtoOrderItem: { ...state.dtoOrderItem, lead_time: (value ?? '') as string }
      } as StateType);
    },
    [state.dtoOrderItem]
  );

  const validateOrderDate = useCallback(async () => {
    if (state.dtoOrder.order_date == null || dayjs(getLocalTime(state.dtoOrder.order_date)).format('MM/DD/YYYY') === '12/31/1899') {
      return 'Order Date is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.order_date]);

  const onOrderDateBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const order_date = await validateOrderDate();
      setState({ errorMessages: { ...state.errorMessages, order_date: order_date } } as StateType);
    }, [validateOrderDate, state.errorMessages]);

  const validateCustomerName = useCallback(async () => {
    if (state.dtoOrder.customer_id === 0) {
      return 'Customer is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.customer_id]);

  const onQuoteNoBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      getQuoteData(state.dtoOrder.quote_id);
      getQuoteItems();
    }, [getQuoteData, state.dtoOrder.quote_id, getQuoteItems]);

  const onCustomerNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      getData3(state.dtoOrder.customer_id);
      getAccountData(state.dtoOrder.customer_id);

      const customer_id = await validateCustomerName();
      setState({ errorMessages: { ...state.errorMessages, customer_id: customer_id } } as StateType);
    }, [getData3, state.dtoOrder.customer_id, getAccountData, validateCustomerName, state.errorMessages]);

  const validateContactName = useCallback(async () => {
    if (state.dtoOrder.contact_id === 0) {
      return 'Contact Person is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.contact_id]);

  const onContactNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const contact_id = await validateContactName();
      setState({ errorMessages: { ...state.errorMessages, contact_id: contact_id } } as StateType);
    }, [validateContactName, state.errorMessages]);

  const validateCurrencyName = useCallback(async () => {
    if (state.dtoOrder.currency_id === 0) {
      return 'Currency Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.currency_id]);

  const onCurrencyNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const currency_id = await validateCurrencyName();
      setState({ errorMessages: { ...state.errorMessages, currency_id: currency_id } } as StateType);
    }, [validateCurrencyName, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoOrder.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.status]);

  const onStatusBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const status = await validateStatus();
      setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
    }, [validateStatus, state.errorMessages]);

  const validateBillingAddress = useCallback(async () => {
    if (state.dtoOrder.billing_address.trim() === '') {
      return 'Billing Address is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.billing_address]);

  const onBillingAddressBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const billing_address = await validateBillingAddress();
      setState({ errorMessages: { ...state.errorMessages, billing_address: billing_address } } as StateType);
    }, [validateBillingAddress, state.errorMessages]);

  const validateBillingCityName = useCallback(async () => {
    if (state.dtoOrder.billing_city_name.trim() === '') {
      return 'Billing City Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.billing_city_name]);

  const onBillingCityNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const billing_city_name = await validateBillingCityName();
      setState({ errorMessages: { ...state.errorMessages, billing_city_name: billing_city_name } } as StateType);
    }, [validateBillingCityName, state.errorMessages]);

  const validateBillingStateName = useCallback(async () => {
    if (state.dtoOrder.billing_state_id === 0) {
      return 'Billing State Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.billing_state_id]);

  const onBillingStateNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const billing_state_id = await validateBillingStateName();
      setState({ errorMessages: { ...state.errorMessages, billing_state_id: billing_state_id } } as StateType);
    }, [validateBillingStateName, state.errorMessages]);

  const validateBillingCountryName = useCallback(async () => {
    if (state.dtoOrder.billing_country_id === 0) {
      return 'Billing Country Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.billing_country_id]);

  const onBillingCountryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const billing_country_id = await validateBillingCountryName();
      setState({ errorMessages: { ...state.errorMessages, billing_country_id: billing_country_id } } as StateType);
    }, [validateBillingCountryName, state.errorMessages]);

  const validateBillingZipCode = useCallback(async () => {
    if (state.dtoOrder.billing_zip_code.trim() === '') {
      return 'Billing Zip Code is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.billing_zip_code]);

  const onBillingZipCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const billing_zip_code = await validateBillingZipCode();
      setState({ errorMessages: { ...state.errorMessages, billing_zip_code: billing_zip_code } } as StateType);
    }, [validateBillingZipCode, state.errorMessages]);

  const validateShippingAddress = useCallback(async () => {
    if (state.dtoOrder.shipping_address.trim() === '') {
      return 'Shipping Address is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.shipping_address]);

  const onShippingAddressBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const shipping_address = await validateShippingAddress();
      setState({ errorMessages: { ...state.errorMessages, shipping_address: shipping_address } } as StateType);
    }, [validateShippingAddress, state.errorMessages]);

  const validateShippingCityName = useCallback(async () => {
    if (state.dtoOrder.shipping_city_name.trim() === '') {
      return 'Shipping City Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.shipping_city_name]);

  const onShippingCityNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const shipping_city_name = await validateShippingCityName();
      setState({ errorMessages: { ...state.errorMessages, shipping_city_name: shipping_city_name } } as StateType);
    }, [validateShippingCityName, state.errorMessages]);

  const validateShippingStateName = useCallback(async () => {
    if (state.dtoOrder.shipping_state_id === 0) {
      return 'Shipping State Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.shipping_state_id]);

  const onShippingStateNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const shipping_state_id = await validateShippingStateName();
      setState({ errorMessages: { ...state.errorMessages, shipping_state_id: shipping_state_id } } as StateType);
    }, [validateShippingStateName, state.errorMessages]);

  const validateShippingCountryName = useCallback(async () => {
    if (state.dtoOrder.shipping_country_id === 0) {
      return 'Shipping Country Name is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.shipping_country_id]);

  const onShippingCountryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const shipping_country_id = await validateShippingCountryName();
      setState({ errorMessages: { ...state.errorMessages, shipping_country_id: shipping_country_id } } as StateType);
    }, [validateShippingCountryName, state.errorMessages]);

  const validateShippingZipCode = useCallback(async () => {
    if (state.dtoOrder.shipping_zip_code.trim() === '') {
      return 'Shipping Zip Code is required';
    } else {
      return null;
    }
  }, [state.dtoOrder.shipping_zip_code]);

  const onShippingZipCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const shipping_zip_code = await validateShippingZipCode();
      setState({ errorMessages: { ...state.errorMessages, shipping_zip_code: shipping_zip_code } } as StateType);
    }, [validateShippingZipCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.order_date = await validateOrderDate();
    if (errorMessages.order_date) {
      isFormValid = false;
    }
    errorMessages.customer_id = await validateCustomerName();
    if (errorMessages.customer_id) {
      isFormValid = false;
    }
    errorMessages.contact_id = await validateContactName();
    if (errorMessages.contact_id) {
      isFormValid = false;
    }
    errorMessages.currency_id = await validateCurrencyName();
    if (errorMessages.currency_id) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateOrderDate, validateCustomerName, validateContactName, validateCurrencyName, validateStatus]);

  const validateForm2 = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.billing_address = await validateBillingAddress();
    if (errorMessages.billing_address) {
      isFormValid = false;
    }
    errorMessages.billing_city_name = await validateBillingCityName();
    if (errorMessages.billing_city_name) {
      isFormValid = false;
    }
    errorMessages.billing_state_id = await validateBillingStateName();
    if (errorMessages.billing_state_id) {
      isFormValid = false;
    }
    errorMessages.billing_country_id = await validateBillingCountryName();
    if (errorMessages.billing_country_id) {
      isFormValid = false;
    }
    errorMessages.billing_zip_code = await validateBillingZipCode();
    if (errorMessages.billing_zip_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateBillingAddress, validateBillingCityName, validateBillingStateName, validateBillingCountryName, validateBillingZipCode]);

  const validateForm3 = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.shipping_address = await validateShippingAddress();
    if (errorMessages.shipping_address) {
      isFormValid = false;
    }
    errorMessages.shipping_city_name = await validateShippingCityName();
    if (errorMessages.shipping_city_name) {
      isFormValid = false;
    }
    errorMessages.shipping_state_id = await validateShippingStateName();
    if (errorMessages.shipping_state_id) {
      isFormValid = false;
    }
    errorMessages.shipping_country_id = await validateShippingCountryName();
    if (errorMessages.shipping_country_id) {
      isFormValid = false;
    }
    errorMessages.shipping_zip_code = await validateShippingZipCode();
    if (errorMessages.shipping_zip_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateShippingAddress, validateShippingCityName, validateShippingStateName, validateShippingCountryName, validateShippingZipCode]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (await validateForm2()) {
            if (await validateForm3()) {
              if (state.dtoOrder.id === 0) {
                const { data } = await addOrder({
                  variables: {
                    order_date: state.dtoOrder.order_date,
                    quote_id: state.dtoOrder.quote_id,
                    customer_id: state.dtoOrder.customer_id,
                    sales_person_id: state.dtoOrder.sales_person_id,
                    contact_id: state.dtoOrder.contact_id,
                    due_date: state.dtoOrder.due_date,
                    notes: state.dtoOrder.notes,
                    customer_ref_no: state.dtoOrder.customer_ref_no,
                    incoterm_id: state.dtoOrder.incoterm_id,
                    term_id: state.dtoOrder.term_id,
                    sub_total_amount: state.dtoOrder.sub_total_amount,
                    shipping_charges: state.dtoOrder.shipping_charges,
                    shipping_tax_id: state.dtoOrder.shipping_tax_id,
                    shipping_tax_amount: state.dtoOrder.shipping_tax_amount,
                    total_amount: state.dtoOrder.total_amount,
                    discount_amount: state.dtoOrder.discount_amount,
                    tax_amount: state.dtoOrder.tax_amount,
                    grand_total_amount: state.dtoOrder.grand_total_amount,
                    currency_id: state.dtoOrder.currency_id,
                    status: state.dtoOrder.status,
                    billing_address: state.dtoOrder.billing_address,
                    billing_city_name: state.dtoOrder.billing_city_name,
                    billing_state_id: state.dtoOrder.billing_state_id,
                    billing_country_id: state.dtoOrder.billing_country_id,
                    billing_zip_code: state.dtoOrder.billing_zip_code,
                    shipping_address: state.dtoOrder.shipping_address,
                    shipping_city_name: state.dtoOrder.shipping_city_name,
                    shipping_state_id: state.dtoOrder.shipping_state_id,
                    shipping_country_id: state.dtoOrder.shipping_country_id,
                    shipping_zip_code: state.dtoOrder.shipping_zip_code,
                    items: state.items.map((item) => {
                      return {
                        id: item.id,
                        item_no: item.item_no,
                        product_id: item.product_id,
                        qty: item.qty,
                        price: item.price,
                        discount_type: item.discount_type,
                        discount: item.discount,
                        discount_amount: item.discount_amount,
                        tax_id: item.tax_id,
                        tax_amount: item.tax_amount,
                        lead_time: item.lead_time,
                        deleted: item.deleted
                      };
                    })
                  }
                });
                if (data?.addOrder) {
                  toast.success('record saved successfully');
                  router.push('/orders/list');
                } else {
                  toast.error('Failed to save the record');
                }
              } else {
                const { data } = await updateOrder({
                  variables: {
                    id: state.dtoOrder.id,
                    order_no: state.dtoOrder.order_no,
                    order_date: state.dtoOrder.order_date,
                    quote_id: state.dtoOrder.quote_id,
                    customer_id: state.dtoOrder.customer_id,
                    sales_person_id: state.dtoOrder.sales_person_id,
                    contact_id: state.dtoOrder.contact_id,
                    due_date: state.dtoOrder.due_date,
                    notes: state.dtoOrder.notes,
                    customer_ref_no: state.dtoOrder.customer_ref_no,
                    incoterm_id: state.dtoOrder.incoterm_id,
                    term_id: state.dtoOrder.term_id,
                    sub_total_amount: state.dtoOrder.sub_total_amount,
                    shipping_charges: state.dtoOrder.shipping_charges,
                    shipping_tax_id: state.dtoOrder.shipping_tax_id,
                    shipping_tax_amount: state.dtoOrder.shipping_tax_amount,
                    total_amount: state.dtoOrder.total_amount,
                    discount_amount: state.dtoOrder.discount_amount,
                    tax_amount: state.dtoOrder.tax_amount,
                    grand_total_amount: state.dtoOrder.grand_total_amount,
                    currency_id: state.dtoOrder.currency_id,
                    status: state.dtoOrder.status,
                    billing_address: state.dtoOrder.billing_address,
                    billing_city_name: state.dtoOrder.billing_city_name,
                    billing_state_id: state.dtoOrder.billing_state_id,
                    billing_country_id: state.dtoOrder.billing_country_id,
                    billing_zip_code: state.dtoOrder.billing_zip_code,
                    shipping_address: state.dtoOrder.shipping_address,
                    shipping_city_name: state.dtoOrder.shipping_city_name,
                    shipping_state_id: state.dtoOrder.shipping_state_id,
                    shipping_country_id: state.dtoOrder.shipping_country_id,
                    shipping_zip_code: state.dtoOrder.shipping_zip_code,
                    items: state.items.map((item) => {
                      return {
                        id: item.id,
                        item_no: item.item_no,
                        product_id: item.product_id,
                        qty: item.qty,
                        price: item.price,
                        discount_type: item.discount_type,
                        discount: item.discount,
                        discount_amount: item.discount_amount,
                        tax_id: item.tax_id,
                        tax_amount: item.tax_amount,
                        lead_time: item.lead_time,
                        deleted: item.deleted
                      };
                    })
                  }
                });
                if (data?.updateOrder) {
                  toast.success('record saved successfully');
                  router.push('/orders/list');
                } else {
                  toast.error('Failed to save the record');
                }
              }
            } else {
              setState({ tabIndex: 2 } as StateType);
            }
          } else {
            setState({ tabIndex: 1 } as StateType);
          }
        } else {
          setState({ tabIndex: 0 } as StateType);
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, validateForm2, validateForm3, addOrder, state.dtoOrder, state.items, router, updateOrder]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/orders/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);

  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4: true } as StateType);
  }, []);

  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);

  const setOpen5 = useCallback(async (): Promise<void> => {
    setState({ open5: true } as StateType);
  }, []);

  const setClose5 = useCallback(async (): Promise<void> => {
    setState({ open5: false } as StateType);
  }, []);

  const setOpen6 = useCallback(async (): Promise<void> => {
    setState({ open6: true } as StateType);
  }, []);

  const setClose6 = useCallback(async (): Promise<void> => {
    setState({ open6: false } as StateType);
  }, []);

  const setOpen8 = useCallback(async (): Promise<void> => {
    setState({ open8: true } as StateType);
  }, []);

  const setClose8 = useCallback(async (): Promise<void> => {
    setState({ open8: false } as StateType);
  }, []);

  const setOpen9 = useCallback(async (): Promise<void> => {
    setState({ open9: true } as StateType);
  }, []);

  const setClose9 = useCallback(async (): Promise<void> => {
    setState({ open9: false } as StateType);
  }, []);

  const setOpen10 = useCallback(async (): Promise<void> => {
    setState({ open10: true } as StateType);
  }, []);

  const setClose10 = useCallback(async (): Promise<void> => {
    setState({ open10: false } as StateType);
  }, []);

  const setOpen11 = useCallback(async (): Promise<void> => {
    setState({ open11: true } as StateType);
  }, []);

  const setClose11 = useCallback(async (): Promise<void> => {
    setState({ open11: false } as StateType);
  }, []);

  const setOpen12 = useCallback(async (): Promise<void> => {
    setState({ open12: true } as StateType);
  }, []);

  const setClose12 = useCallback(async (): Promise<void> => {
    setState({ open12: false } as StateType);
  }, []);

  const setOpen13 = useCallback(async (): Promise<void> => {
    setState({ open13: true } as StateType);
  }, []);

  const setClose13 = useCallback(async (): Promise<void> => {
    setState({ open13: false } as StateType);
  }, []);

  const setOpen14 = useCallback(async (): Promise<void> => {
    setState({ open14: true } as StateType);
  }, []);

  const setClose14 = useCallback(async (): Promise<void> => {
    setState({ open14: false } as StateType);
  }, []);

  const setOpen15 = useCallback(async (): Promise<void> => {
    setState({ open15: true } as StateType);
  }, []);

  const setClose15 = useCallback(async (): Promise<void> => {
    setState({ open15: false } as StateType);
  }, []);

  const setOpen16 = useCallback(async (): Promise<void> => {
    setState({ open16: true } as StateType);
  }, []);

  const setClose16 = useCallback(async (): Promise<void> => {
    setState({ open16: false } as StateType);
  }, []);

  const setOpen17 = useCallback(async (): Promise<void> => {
    setState({ open17: true } as StateType);
  }, []);

  const setClose17 = useCallback(async (): Promise<void> => {
    setState({ open17: false } as StateType);
  }, []);

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      if (await validateForm()) {
        setState({ openPopup: true, dtoOrderItem: ORDER_ITEM, errorMessages1: { ...ERROR_MESSAGES1 } } as StateType);
      }
    },
    [ERROR_MESSAGES1]
  );

  const toggleDialog = useCallback(async (): Promise<void> => {
    setState({ visibleDialog: !state.visibleDialog } as StateType);
  }, [state.visibleDialog]);

  const onDeleteAllClick = useCallback(async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    await toggleDialog();
  }, []);

  const toggleDialog1 = useCallback(
    async (id: number): Promise<void> => {
      setState({ visibleDialog1: { id: id, visibility: !state.visibleDialog1.visibility } } as StateType);
    },
    [state.visibleDialog1.visibility]
  );
  const onCheckChange = useCallback(
    async (
      model: GridRowSelectionModel
      //details: GridCallbackDetails<any>
    ): Promise<void> => {
      setState({ arrSelectedId: model as number[] } as StateType);
    },
    []
  );
  const rowDoubleClick: GridEventListener<'rowDoubleClick'> = useCallback(
    async (
      params, // GridRowParams
      event, // MuiEvent<React.MouseEvent<HTMLElement>>
      details // GridCallbackDetails
    ) => {
      if (await validateForm()) {
        console.log(event, details);
        setState({ openPopup: true, dtoOrderItem: params.row, contextMenu: null, errorMessages1: { ...ERROR_MESSAGES1 } } as StateType);
      }
    },
    [ERROR_MESSAGES1]
  );

  const handleContextMenu = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      const item_no = Number(event.currentTarget.getAttribute('data-id'));
      //const item_no = state.items.filter((item, index) => item.item_no === id)[0].item_no;
      event.preventDefault();
      setState({
        //selectedRow: id,
        item_no: item_no,
        contextMenu: state.contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
      } as StateType);
    },
    [state.contextMenu, state.items]
  );

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      if (await validateForm()) {
        setState({
          openPopup: true,
          dtoOrderItem: state.items.filter((item) => item.item_no === state.item_no)[0],
          contextMenu: null,
          errorMessages1: { ...ERROR_MESSAGES1 }
        } as StateType);
      }
    },
    [state.items, state.item_no, ERROR_MESSAGES1]
  );

  const onDeleteClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog1(state.item_no);
      await handleClose();
    },
    [state.item_no, toggleDialog1, handleClose]
  );

  const onClosePopup = useCallback(async (): Promise<void> => {
    setState({
      openPopup: false
    } as StateType);
  }, []);

  const onClose = useCallback(
    async (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason !== 'backdropClick') {
        onClosePopup();
      }
    },
    [onClosePopup]
  );

  const DeleteSelected = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      const items: OrderItemDTO[] = [...state.items].map((item) => {
        return { ...item };
      });
      for (let i = 0; i < items.length; i++) {
        if (state.arrSelectedId.includes(items[i].item_no)) {
          items[i].deleted = true;
        }
      }
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].deleted == false) {
          items[i].item_no = ++count;
          //items[i].id = items[i].item_no;
        }
      }
      setState({
        items: items,
        arrSelectedId: [] as number[]
      } as StateType);
      await toggleDialog();
    },
    [state.items, state.arrSelectedId, toggleDialog]
  );

  const DeleteSingle = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      const items = state.items.map((item) => {
        return { ...item };
      });
      for (let i = 0; i < items.length; i++) {
        if (items[i].item_no == state.visibleDialog1.id) {
          items[i].deleted = true;
        }
      }
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].deleted == false) {
          items[i].item_no = ++count;
          //items[i].id = items[i].item_no;
        }
      }
      await toggleDialog1(0);
      setState({
        items: items
      } as StateType);
    },
    [state.visibleDialog1.id, state.items, toggleDialog1]
  );
  const validateProductName = useCallback(async () => {
    if (state.dtoOrderItem.product_id === 0) {
      return 'Product Name is required';
    } else if (
      state.items.filter(
        (item) => item.item_no != state.dtoOrderItem.item_no && item.product_id === state.dtoOrderItem.product_id && item.deleted == false
      ).length > 0
    ) {
      return 'Product Name already exists';
    } else {
      return null;
    }
  }, [state.dtoOrderItem.product_id, state.items]);

  const onProductNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const dtoProduct = await getProductData(state.dtoOrderItem.product_id);
      const dtoProductPrice = await getProductPriceData(state.dtoOrderItem.product_id, state.dtoOrder.currency_id);
      const product_id = await validateProductName();
      setState({
        dtoOrderItem: {
          ...state.dtoOrderItem,
          part_number: dtoProduct.part_number,
          unit_name: dtoProduct.unit_name,
          price: dtoProductPrice.unit_price
        },
        errorMessages1: { ...state.errorMessages1, product_id: product_id }
      } as StateType);
    }, [
    getProductData,
    state.dtoOrderItem.product_id,
    getProductPriceData,
    state.dtoOrder.currency_id,
    validateProductName,
    state.errorMessages1
  ]);

  const validateQty = useCallback(async () => {
    if (state.dtoOrderItem.qty === 0) {
      return 'Quantity is required';
    } else {
      return null;
    }
  }, [state.dtoOrderItem.qty]);

  const onQtyBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const qty = await validateQty();
      setState({ errorMessages1: { ...state.errorMessages1, qty: qty } } as StateType);
    }, [validateQty, state.errorMessages1]);

  const validatePrice = useCallback(async () => {
    if (state.dtoOrderItem.price === 0) {
      return 'Price is required';
    } else {
      return null;
    }
  }, [state.dtoOrderItem.price]);

  const onPriceBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const price = await validatePrice();
      setState({ errorMessages1: { ...state.errorMessages1, price: price } } as StateType);
    }, [validatePrice, state.errorMessages1]);

  const validateLeadTime = useCallback(async () => {
    if (state.dtoOrderItem.lead_time.trim() === '') {
      return 'Lead Time is required';
    } else {
      return null;
    }
  }, [state.dtoOrderItem.lead_time]);

  const onLeadTimeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const lead_time = await validateLeadTime();
      setState({ errorMessages1: { ...state.errorMessages1, lead_time: lead_time } } as StateType);
    }, [validateLeadTime, state.errorMessages1]);

  const validateForm1 = useCallback(async () => {
    let isFormValid = true;
    const errorMessages1: ErrorMessageType1 = {} as ErrorMessageType1;
    errorMessages1.product_id = await validateProductName();
    if (errorMessages1.product_id) {
      isFormValid = false;
    }
    errorMessages1.qty = await validateQty();
    if (errorMessages1.qty) {
      isFormValid = false;
    }
    errorMessages1.price = await validatePrice();
    if (errorMessages1.price) {
      isFormValid = false;
    }
    setState({ errorMessages1: errorMessages1 } as StateType);
    return isFormValid;
  }, [validateProductName, validateQty, validatePrice]);

  const onOKClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      if (await validateForm1()) {
        const items: OrderItemDTO[] = [...state.items];
        const dtoOrderItem = { ...state.dtoOrderItem };
        let index: number = -1;
        for (let i = 0; i < items.length; i++) {
          if (items[i].item_no === dtoOrderItem.item_no) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          dtoOrderItem.item_no = items.length + 1;
          items.push(dtoOrderItem);
        } else {
          items[index] = dtoOrderItem;
        }
        // let totalamount: number = 0;
        // for (let i = 0; i < items.length; i++) {
        //   totalamount += items[i].qty * items[i].price;
        // }
        setState({
          items: items,
          openPopup: false
        } as StateType);
      }
    },
    [state.items, state.dtoOrderItem, validateForm1]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  const onBillingStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, billing_state_id: (value as LookupDTO).id, billing_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onBillingCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, billing_country_id: (value as LookupDTO).id, billing_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onShippingStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, shipping_state_id: (value as LookupDTO).id, shipping_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onShippingCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOrder: { ...state.dtoOrder, shipping_country_id: (value as LookupDTO).id, shipping_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOrder]
  );

  const onCopyClick = useCallback(async () =>
    //event: React.MouseEvent<HTMLElement>
    {
      setState({
        dtoOrder: {
          ...state.dtoOrder,
          shipping_address: state.dtoOrder.billing_address,
          shipping_city_name: state.dtoOrder.billing_city_name,
          shipping_state_id: state.dtoOrder.billing_state_id,
          shipping_state_code: state.dtoOrder.billing_state_code,
          shipping_state_name: state.dtoOrder.billing_state_name,
          shipping_country_id: state.dtoOrder.billing_country_id,
          shipping_country_name: state.dtoOrder.billing_country_name,
          shipping_zip_code: state.dtoOrder.billing_zip_code
        }
      } as StateType);
    }, [state.dtoOrder]);
  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData9 = useCallback(async (): Promise<void> => {
    let arrBillingStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoOrder.billing_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrBillingStateLookup = data.getStateLookup;
    }
    setState({ arrBillingStateLookup: arrBillingStateLookup } as StateType);
  }, [getStateLookup, state.dtoOrder.billing_country_id]);

  const getData10 = useCallback(async (): Promise<void> => {
    let arrShippingStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoOrder.shipping_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrShippingStateLookup = data.getStateLookup;
    }
    setState({ arrShippingStateLookup: arrShippingStateLookup } as StateType);
  }, [getStateLookup, state.dtoOrder.shipping_country_id]);

  useEffect(() => {
    getData9();
  }, [getData9, state.dtoOrder.billing_country_id]);

  useEffect(() => {
    getData10();
  }, [getData10, state.dtoOrder.shipping_country_id]);

  return {
    apiRef,
    paginationModel,
    setPaginationModel,
    state,
    onInputChange,
    onInputChange1,
    onQuoteNoChange,
    onCustomerNameChange,
    onContactNameChange,
    onIncotermChange,
    onTermChange,
    onCurrencyNameChange,
    onStatusChange,
    onSalesPersonNameChange,
    onOrderDateChange,
    onDueDateChange,
    onProductNameChange,
    onDiscountTypeChange,
    onTaxChange,
    onTax1Change,
    onLeadTimeChange,
    onBillingStateNameChange,
    onBillingCountryNameChange,
    onShippingStateNameChange,
    onShippingCountryNameChange,
    onOrderDateBlur,
    onQuoteNoBlur,
    onCustomerNameBlur,
    onContactNameBlur,
    onCurrencyNameBlur,
    onStatusBlur,
    onBillingAddressBlur,
    onBillingCityNameBlur,
    onBillingStateNameBlur,
    onBillingCountryNameBlur,
    onBillingZipCodeBlur,
    onShippingAddressBlur,
    onShippingCityNameBlur,
    onShippingStateNameBlur,
    onShippingCountryNameBlur,
    onShippingZipCodeBlur,
    onProductNameBlur,
    onQtyBlur,
    onPriceBlur,
    onLeadTimeBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6,
    setOpen8,
    setClose8,
    setOpen9,
    setClose9,
    setOpen10,
    setClose10,
    setOpen11,
    setClose11,
    setOpen12,
    setClose12,
    setOpen13,
    setClose13,
    setOpen14,
    setClose14,
    setOpen15,
    setClose15,
    setOpen16,
    setClose16,
    setOpen17,
    setClose17,
    onAddClick,
    onDeleteAllClick,
    onCheckChange,
    rowDoubleClick,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onEditClick,
    onDeleteClick,
    onClosePopup,
    onClose,
    toggleDialog,
    toggleDialog1,
    DeleteSelected,
    DeleteSingle,
    onOKClick,
    handleTabChange,
    onCopyClick
  };
};

export default useOrderEntry;
