export const contactInfo = {
  email: "kamleshmundel18@gmail.com",
  emailLabel: "Kamleshmundel18@gmail.com",
  phone: "+91 77909 97718",
  phoneHref: "tel:+917790997718",
  linkedInUrl: "https://in.linkedin.com/in/kamlesh-mundel-88b7401a1",
  linkedInLabel: "LinkedIn",
  location: "Ahmedabad, India",
} as const;

/** EmailJS public client config (safe for the browser). */
export const emailJsConfig = {
  serviceId:
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_e0x4ojc",
  templateId:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_3bqyont",
  publicKey:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "TZ6CTSHx_Zge9EkCb",
} as const;
