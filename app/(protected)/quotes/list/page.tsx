import { Metadata } from 'next';
import ClientQuoteList from './client-quote-list';
import {
  GET_QUOTE_DATE_WISE_COUNT,
  GET_QUOTE_LOST_COUNT,
  GET_QUOTE_OPEN_COUNT,
  GET_QUOTE_WON_COUNT,
  QUOTE_LIST
} from '@/app/graphql/Quote';
import { defaultPageSize, getLocalTime } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import QuoteDTO from '@/app/types/QuoteDTO';
import dayjs from 'dayjs';
export const metadata: Metadata = {
  title: 'Quotes'
};

export const revalidate = 0;

export default async function QuoteListPage() {
  let arrQuoteDTO: QuoteDTO[] = [];
  let total_records: number = 0;
  let totalDatewise: any = { total: 0, xAxisData: [], yAxisData: [] };
  let totalOpen: number = 0;
  let totalWon: number = 0;
  let totalLost: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: QUOTE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const result1 = apolloClient.query({
      query: GET_QUOTE_DATE_WISE_COUNT,
      variables: {
        from_date: new Date(),
        to_date: new Date()
      }
    });
    const result2 = apolloClient.query({
      query: GET_QUOTE_OPEN_COUNT
    });
    const result3 = apolloClient.query({
      query: GET_QUOTE_WON_COUNT
    });
    const result4 = apolloClient.query({
      query: GET_QUOTE_LOST_COUNT
    });
    const results = await Promise.all([result, result1, result2, result3, result4]);
    if (results[0]?.data?.getQuoteList?.quotes) {
      arrQuoteDTO = results[0].data.getQuoteList.quotes;
    }
    if (results[0]?.data?.getQuoteList?.total_records) {
      total_records = results[0].data.getQuoteList.total_records;
    }
    if (results[1]?.data?.getQuoteThisMonthDatewiseCount) {
      let total = 0;
      const xAxisData = [];
      const yAxisData = [];
      for (let i = 0; i < results[1].data.getQuoteThisMonthDatewiseCount.length; i++) {
        xAxisData.push(dayjs(getLocalTime(results[1].data.getQuoteThisMonthDatewiseCount[i].quote_date)));
        yAxisData.push(results[1].data.getQuoteThisMonthDatewiseCount[i].total);
        total += results[1].data.getQuoteThisMonthDatewiseCount[i].total;
      }

      totalDatewise = { total, xAxisData, yAxisData };
    }
    if (results[2]?.data?.getQuoteOpenCount) {
      totalOpen = results[2].data.getQuoteOpenCount;
    }
    if (results[3]?.data?.getQuoteWonCount) {
      totalWon = results[3].data.getQuoteWonCount;
    }
    if (results[4]?.data?.getQuoteLostCount) {
      totalLost = results[4].data.getQuoteLostCount;
    }
  } catch {}
  return (
    <ClientQuoteList
      arrQuoteDTO={arrQuoteDTO}
      total_records={total_records}
      totalDatewise={totalDatewise}
      totalOpen={totalOpen}
      totalWon={totalWon}
      totalLost={totalLost}
    ></ClientQuoteList>
  );
}
