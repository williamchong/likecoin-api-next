import { ISTIO_TRACING_HEADERS } from '../constant';

export function getIstioHeaders(req) {
  const headers = {};
  if (!req || !ISTIO_TRACING_HEADERS) return headers;
  ISTIO_TRACING_HEADERS.forEach((header) => {
    if (req.headers[header]) headers[header] = req.headers[header];
  });
  return headers;
}

export default getIstioHeaders;
