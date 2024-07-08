export const magicLinkEmailTemplate = (name: string, link: string): string => `
  <h1>Hello, ${name}!</h1>
  <p>Click the link below to log in:</p>
  <a href="${link}">Log in</a>
`;
