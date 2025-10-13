// graphql/chat.ts
import { gql } from '@apollo/client';

export const CHATBOT_REPLY = gql`
  mutation ChatbotReply($input: String!) {
    chatbotReply(message: $input) {
      response
    }
  }
`;
