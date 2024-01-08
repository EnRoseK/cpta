export const convertAttachmentUrl = (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_ATTACHMENT_BASE_URL;

  return `${baseUrl}${url}`;
};
