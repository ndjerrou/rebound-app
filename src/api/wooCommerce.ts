import { HmacSHA1 } from 'crypto-js';
import encBase64 from 'crypto-js/enc-base64';
import OAuth from 'oauth-1.0a';

const apiWooCommerce = new OAuth({
  consumer: {
    key: `${process.env.REACT_APP_WC_CONSUMER_KEY}`,
    secret: `${process.env.REACT_APP_WC_CONSUMER_SECRET}`,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key): string {
    return HmacSHA1(baseString, key).toString(encBase64);
  },
});

export default apiWooCommerce;
