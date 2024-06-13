// import type { ServiceAccount } from "firebase-admin";
// import { initializeApp, cert } from "firebase-admin/app";

// // const serviceAccount = {
// //   type: "service_account",
// //   project_id: import.meta.env.FIREBASE_PROJECT_ID,
// //   private_key_id:import.meta.env.FIREBASE_PRIVATE_KEY_ID,
// //   private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
// //   client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
// //   client_id: import.meta.env.FIREBASE_CLIENT_ID,
// //   auth_uri: import.meta.env.FIREBASE_AUTH_URI,
// //   token_uri: import.meta.env.FIREBASE_TOKEN_URI,
// //   auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
// //   client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
// // };

// const serviceAccount = {
//   type: "service_account",
//   project_id: "astro-template-df398",
//   private_key_id: "8521eba0111f74b9fe4e3eecad117bfd46d07269",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHCXMjWEoPe/Z3\nDLYUx/G/aR0TD4VsaAFib/4py7Bn5RCmtRBWWKXSZXQ9so+r8bjeATVg18EUmIJx\n3YxI6gi/TOtbGOPY65S0+AdZcB6JRCRHgoot+5yFsgfDD5NDUO1f/uCgqRsjQSWl\nCvGFDdvXrja9g//szlNJnNuFDsdG+dZHPXQFljkaMB1zp9qwf3Jgg4rMmkIP07I6\nfBjvkJpcD6yxmigeWbzhqjZDDVU5+rTJ1NZ7zUaGEZ9dP7rlkwN48xxjaCXQM1hL\nMywsCnN4bjjOKGPVLJxFPF2KJ4SI0r8V3xLWAuc1LXRTW5rGjR0hrSnzZOXO1feE\n9GOBTJovAgMBAAECggEAEuzXmVNCS4GeeEhpocU3O9uLS64soherlggPEztObTqP\nIELUKFmqfrxt1pX9ajyENvvHbwtkzQgJUzldJuu15Da0pEdUFuKjk6eHz13FUYj8\nqB4F9IRZqC665TW8a2itAXUzN6OMtIfzw+Mr/tpH/pSOmOuNsJ8XtUaoatjyYtGg\nfHbdKHkVLU/NDgHnm5/T0+Jq/9tlJg4ScspSn9S7eklacupscv2STKseiCKbN7HF\nngnR51/NfjmltE6nwjRlzISKU+DPY++pDMoaUseaiS0E7pODrtCsIM1Q+QL9NAtE\nhqYNjaPhXgZliGVWFoaFxNzwwVf0hcmIrdksBs0qMQKBgQD7cw0/LnUXhARTRlXh\n8SCiMBwKXCGkV/jsh0By9M4pG7y2QfJG4nY6k5xJIimq0UqXDjknkT+uPBytmJ3v\nQUq5yHd9b2vox1EI7sRfPyinka70qjA5Dbb718z4I1YYx1YYMKIQJPY1OKSPju79\nGcJl+EkoENC+sHyXCSd7VlCMXwKBgQDKo5MLMLfvgzE3z6fjnCAAXnzecXtjjHad\nfKUbu87Q2O26V9/w84CIESd9yXEDUVVf5w30QQV5+DLbdnBfIWPVOf1XqMefVTYo\nerlmaTfugEmQHfQB2SvtuTukfU/R9ylGIZV98vJ8IeM6zPmBhOrpTnVMQGvGbEyU\n046M2DfEMQKBgB3jaRmvff+Tk6gKXj8DGGvu6AZbOSx9wHrtAL4pVzAPufi4EgJW\n/NKtpRAUXXuOcR1PdX+8hiNBxe7kizFbQ3Sd3YYtblg3COzU5MaljUGN0YwHhr/h\nX3TEC/sayCsd1p/9d+YPXqyo1PazeLjhDPht8NQwW3+vHsAdOHIyqlRlAoGARjgE\nnl4VfwPhLEvjC7ZwSHB1qMd+UHK+L7ifpkqgUjK5vlbxHRfkNEJtguMpLFMk2ITC\nix90/F0Lko0qR2zUoXDk31l3QzlN+Rz93gUcAqOl2jDm+zT8SfZkOo3J+SJCxTCi\nEvD7IhTEHv4kf8NFe+9aKkAwmKOyrefZf+j0+iECgYBNPLTDZ4tybeZUE+cPyGJB\nJMbe1Wpn1Gas2MDgv5wRW8mOUuZDF86pjsHQfPeEavDJjRN33+1kjU4DHvjt5DEC\nEdXERucjS/g8IwvwFPhHxT4Th7UfDpqpuMP7Txc3usZ8M2+0S/5fL3WMM0u+amMt\n9tc2QJI+36+ooph3OZEopA==\n-----END PRIVATE KEY-----\n",
//   client_email:
//     "firebase-adminsdk-uf55d@astro-template-df398.iam.gserviceaccount.com",
//   client_id: "107385778075924663505",
//   auth_uri: "astro-template-df398.firebaseapp.com",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uf55d%40astro-template-df398.iam.gserviceaccount.com",
// };

// export const app = initializeApp({
//   credential: cert(serviceAccount as ServiceAccount),
// });

