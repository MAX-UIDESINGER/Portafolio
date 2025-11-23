import CustomScrollContainer from "@/utils/CustomScrollContainer";
import {
  RiArrowDownSFill,
  RiArrowRightSFill,
  RiExternalLinkLine,
  RiMailFill,
  RiPhoneFill,
} from "@remixicon/react";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const Contact: React.FC = () => {
  const [isContactsOpen, setContactsOpen] = useState(false);
  const [isPersonalOpen, setPersonalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [hasAnimated, setHasAnimated] = useState(false);
const [animatedLines, setAnimatedLines] = useState<number[]>([]);
  // 🔹 Función para obtener la fecha actual en formato "Thu 21 Apr"
  const getCurrentDate = () => {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];

    return `${dayName} ${day} ${monthName}`;
  };

  // 🔹 Validaciones simples
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    // Nombre solo letras
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      newErrors.name = "Only letters are allowed";
    }

    // Email formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Wrong email address";
    }

    // Mensaje no vacío
    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true si no hay errores
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Opcional: limpiar el error al escribir
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // ⛔ si hay errores, no envía

    // 🔹 Si todo bien → envía con EmailJS
    const serviceID = "service_bpf6ctm";
    const templateID = "template_4gl712g";
    const publicKey = "uX-eBB7-VCZ4jihJ7";

    emailjs
      .send(serviceID, templateID, form, publicKey)
      .then(() => {
        //  Éxito: mostrar mensaje y resetear formulario
        setIsSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setErrors({}); // También limpiamos los errores
      })
      .catch((error) => {
        setIsSubmitted(false);
        console.error("Error sending email:", error);
      });
  };

  const isFormValid = form.name && form.email && form.message;

 // 🔹 Efecto para animar línea por línea
  useEffect(() => {
    const totalLines = 12; // Número total de líneas de código
    const timeouts: NodeJS.Timeout[] = [];

    // Animar cada línea con un delay progresivo
    for (let i = 0; i < totalLines; i++) {
      const timeout = setTimeout(() => {
        setAnimatedLines(prev => [...prev, i]);
      }, i * 200); // 200ms entre cada línea
      
      timeouts.push(timeout);
    }

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  // 🔹 Función para verificar si una línea ya fue animada
  const isLineAnimated = (lineNumber: number) => {
    return animatedLines.includes(lineNumber);
  };
  return (
    <div className="h-full w-full flex flex-col lg:flex-row bg-[#0F172B]">
      {/* titulo en movil  */}
      <div className="flex items-center p-6 gap-2.5 w-full h-[68px] md:hidden">
        <p className="w-full font-fira-code font-medium text-sm leading-[20px] text-slate-50">
          _contact-me
        </p>
      </div>

      {/* Page Items - Sidebar */}
      <div className="lg:w-[312px] flex flex-col border-r border-[#314158] bg-[#0F172B] shrink-0 w-full">
        {/* CONTACTS */}
        <div
          className="flex items-center px-4 lg:px-6 py-3 gap-3 h-12 border-b border-[#314158] cursor-pointer lg:cursor-default bg-[#314158] md:bg-transparent"
          onClick={() => setContactsOpen(!isContactsOpen)}
        >
          <div className="flex items-center gap-3 flex-1">
            {/* Ícono flecha */}
            <div className="md:hidden">
              {isContactsOpen ? (
                <RiArrowDownSFill className="w-4 h-4 text-white transition-transform duration-300" />
              ) : (
                <RiArrowRightSFill className="w-4 h-4 text-white transition-transform duration-300" />
              )}
            </div>
            <div className="hidden md:block">
              <RiArrowDownSFill className="w-4 h-4 text-white transition-transform duration-300" />
            </div>
            <span className="font-fira-code font-normal text-sm lg:text-base text-[#F8FAFC]">
              contacts
            </span>
          </div>
        </div>

        {/* List contacts */}
        <div className={`${isContactsOpen ? "block" : "hidden"} lg:block`}>
          <div className="flex flex-col items-start p-3 gap-3 w-full">
            {/* Email */}
            <div className="flex items-center gap-3 px-3 text-[#90A1B9] hover:text-white cursor-pointer transition">
              <RiMailFill className="w-4 h-4" />
              <span className="font-['Fira_Code'] font-normal text-base leading-6">
                email.md
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 px-3 text-[#90A1B9] hover:text-white cursor-pointer transition">
              <RiPhoneFill className="w-4 h-4" />
              <span className="font-['Fira_Code'] font-normal text-base leading-6">
                phone.md
              </span>
            </div>
          </div>
        </div>

        {/* GAP solo en móvil */}
        <div className="block lg:hidden h-4"></div>

        {/* PERSONAL-INFO */}
        <div
          className="flex items-center px-4 lg:px-6 py-3 gap-3 h-12 border-t border-b border-[#314158] cursor-pointer lg:cursor-default bg-[#314158] md:bg-transparent"
          onClick={() => setPersonalOpen(!isPersonalOpen)}
        >
          <div className="flex items-center gap-3 flex-1">
            {/* Ícono flecha */}
            <div className="md:hidden">
              {isPersonalOpen ? (
                <RiArrowDownSFill className="w-4 h-4 text-white transition-transform duration-300" />
              ) : (
                <RiArrowRightSFill className="w-4 h-4 text-white transition-transform duration-300" />
              )}
            </div>
            <div className="hidden md:block">
              <RiArrowDownSFill className="w-4 h-4 text-white transition-transform duration-300" />
            </div>
            <span className="font-fira-code font-normal text-sm lg:text-base text-[#F8FAFC]">
              find-me-also-in
            </span>
          </div>
        </div>

        {/* List personal-info */}
        <div className={`${isPersonalOpen ? "block" : "hidden"} lg:block`}>
          <div className="flex flex-col items-start p-3 gap-3 w-full">
            {/* github */}
            <div className="flex items-center gap-3 px-3 text-[#90A1B9] hover:text-white cursor-pointer transition">
              <RiExternalLinkLine className="w-4 h-4" />
              <span className="font-['Fira_Code'] font-normal text-base leading-6">
                github.md
              </span>
            </div>

            {/* linkedin */}
            <div className="flex items-center gap-3 px-3 text-[#90A1B9] hover:text-white cursor-pointer transition">
              <RiExternalLinkLine className="w-4 h-4" />
              <span className="font-['Fira_Code'] font-normal text-base leading-6">
                linkedin.md
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Tabs */}
        <div className="hidden sm:flex box-border flex-row items-start p-0 w-full h-12 border-b border-[#314158]">
          <div className="flex items-center min-w-full lg:min-w-[242px] h-12  px-4 lg:px-6 gap-3"></div>
        </div>

        {/* Contact Area */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
          {/* Contact Form */}
          <div
            className="box-border flex flex-col items-center
        p-6 md:p-32 md:py-[130px] gap-16 w-full md:w-[632px] md:border-r border-[#314158] flex-shrink-0
        overflow-y-auto h-full min-h-0" // Cambios importantes aquí
          >
            {isSubmitted && (
              <div className="flex flex-col items-center justify-center gap-8 w-full max-w-[372px] flex-1">
                {/* Contenido del mensaje */}
                <div className="flex flex-col items-center gap-2">
                  <h4 className="w-full  font-medium text-3xl leading-[42px] text-center text-[#F8FAFC]">
                    Thank you! 🤘
                  </h4>
                  {/* Mensaje de confirmación */}
                  <p className="w-full   text-lg leading-[27px] text-center text-[#90A1B9]">
                    Your message has been accepted. You will receive answer
                    soon!
                  </p>
                </div>

                {/* Botón para enviar nuevo mensaje */}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="flex justify-center items-center py-2.5 px-3 gap-2.5 w-[159px] h-10 bg-[#FFB86A] rounded-md hover:bg-[#e6a457] transition-colors"
                >
                  <span className="  text-sm leading-[20px] text-[#020618]">
                    send-new-message
                  </span>
                </button>
              </div>
            )}

            {!isSubmitted && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start gap-6 w-full max-w-[372px]"
              >
                {/* Name Input */}
                <div className="flex flex-col w-full gap-1.5">
                  <label className=" text-base text-[#90A1B9]">_name:</label>
                  <div
                    className={`box-border flex items-center p-3 w-full h-12 rounded-md 
          ${
            errors.name
              ? "bg-[rgba(70,8,9,0.3)] border border-[#FB2C36]"
              : "bg-[#020618] border border-[#314158] focus-within:border-white"
          } 
          transition-colors`}
                  >
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full font-['Fira_Code'] text-base text-[#90A1B9] bg-transparent border-none outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-[#FB2C36] font-medium">
                      Wrong name address
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="flex flex-col w-full gap-1.5">
                  <label className="font-['Fira_Code'] text-base text-[#90A1B9]">
                    _email:
                  </label>
                  <div
                    className={`box-border flex items-center p-3 w-full h-12 rounded-lg 
                     ${
                       errors.email
                         ? "bg-[rgba(70,8,9,0.3)] border border-[#FB2C36]"
                         : "bg-[#020618] border border-[#314158] focus-within:border-white"
                     } transition-colors`}
                  >
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full font-['Fira_Code'] text-base text-[#90A1B9] bg-transparent border-none outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-[#FB2C36] font-medium">
                      Wrong email address
                    </p>
                  )}
                </div>
                {/* Message Textarea */}
                <div className="flex flex-col w-full gap-1.5">
                  <label className="font-['Fira_Code'] text-base text-[#90A1B9]">
                    _message:
                  </label>
                  <div
                    className={
                      "box-border flex items-start p-3 w-full h-[120px] rounded-lg bg-[#020618] border border-[#314158] focus-within:border-white"
                    }
                  >
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full h-full font-['Fira_Code'] text-base text-[#90A1B9] bg-transparent border-none outline-none resize-none"
                      placeholder="Enter your message"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`flex justify-center items-center p-2.5 px-3 w-[142px] h-10 rounded-md cursor-pointer transition-colors 
        ${
          isFormValid
            ? "bg-[#FFB864] hover:bg-[#e6a457] text-black"
            : "bg-[#314158] text-[#62748E] cursor-not-allowed"
        }`}
                >
                  <span className="font-['Fira_Code'] text-sm">
                    submit-message
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Code area (solo en sm y más grande) */}
           {/* Code area */}
      <CustomScrollContainer>
        <div className="hidden sm:block flex-[2] p-4 min-h-0 overflow-auto">
          <div className="flex gap-[40px] mt-[12px]">
            {/* line numbers */}
            <div className="shrink-0 font-normal text-sm leading-6 text-right text-[#90A1B9] select-none lg:text-base">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* code block - CON ANIMACIÓN COMPLETA */}
           <pre className="whitespace-pre-wrap overflow-x-auto text-sm leading-6 font-['Fira_Code'] lg:text-base bg-[#0F172B] rounded-lg">
              <code>
                {/* Línea 1 */}
                <div className={`${isLineAnimated(0) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  <span className="text-[#C27AFF]">const</span>{" "}
                  <span className="text-[#615FFF]">button</span>{" "}
                  <span className="text-[#C27AFF]">=</span>{" "}
                  <span className="text-[#615FFF]">document</span>
                  <span className="text-[#F8FAFC]">{"."}</span>
                  <span className="text-[#615FFF]">querySelector</span>
                  <span className="text-[#F8FAFC]">{"("}</span>
                  <span className="text-[#FFB864]">'#sendBtn'</span>
                  <span className="text-[#F8FAFC]">{");"}</span>
                </div>

                {/* Línea 2 - vacía */}
                <div className={`h-6 ${isLineAnimated(1) ? 'animate-lineAppear' : 'opacity-0'}`}></div>

                {/* Línea 3 */}
                <div className={`${isLineAnimated(2) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  <span className="text-[#C27AFF]">const</span>{" "}
                  <span className="text-[#615FFF]">message </span>{" "}
                  <span className="text-[#C27AFF]">=</span>{" "}
                  <span className="text-[#F8FAFC]">{"{"}</span>
                </div>

                {/* Línea 4 */}
                <div className={`${isLineAnimated(3) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  {"  "}
                  <span className="text-[#615FFF]">name:</span>
                  <span className="text-[#FFB864]">"{form.name || "Jonathan Davis"}"</span>
                  <span className="text-[#F8FAFC]">{","}</span>
                </div>

                {/* Línea 5 */}
                <div className={`${isLineAnimated(4) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  {"  "}
                  <span className="text-[#615FFF]">email:</span>
                  <span className="text-[#FFB864]">"{form.email || "..."}"</span>
                  <span className="text-[#F8FAFC]">{","}</span>
                </div>

                {/* Línea 6 */}
                <div className={`${isLineAnimated(5) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  {"  "}
                  <span className="text-[#615FFF]">message:</span>
                  <span className="text-[#FFB864]">"{form.message || "..."}"</span>
                  <span className="text-[#F8FAFC]">{","}</span>
                </div>

                {/* Línea 7 */}
                <div className={`${isLineAnimated(6) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  {"  "}
                  <span className="text-[#615FFF]">date:</span>
                  <span className="text-[#FFB864]">"{getCurrentDate()}"</span>
                  <span className="text-[#F8FAFC]">{","}</span>
                </div>

                {/* Línea 8 */}
                <div className={`${isLineAnimated(7) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  <span className="text-[#F8FAFC]">{"}"}</span>
                </div>

                {/* Línea 9 - vacía */}
                <div className={`h-6 ${isLineAnimated(8) ? 'animate-lineAppear' : 'opacity-0'}`}></div>

                {/* Línea 10 */}
                <div className={`${isLineAnimated(9) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  <span className="text-[#615FFF]">button</span>{" "}
                  <span className="text-[#F8FAFC]">{"."}</span>
                  <span className="text-[#615FFF]">addEventListener</span>{" "}
                  <span className="text-[#F8FAFC]">{"("}</span>
                  <span className="text-[#FFB864]">'click'</span>
                  <span className="text-[#F8FAFC]">{","}</span>
                  <span className="text-[#F8FAFC]">{"()"}</span>
                  <span className="text-[#C27AFF]">{"=>"} </span>{" "}
                  <span className="text-[#F8FAFC]">{"{"}</span>
                </div>

                {/* Línea 11 */}
                <div className={`${isLineAnimated(10) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  {" "}
                  <span className="text-[#615FFF]">form</span>
                  <span className="text-[#F8FAFC]">{"."}</span>
                  <span className="text-[#615FFF]">send</span>{" "}
                  <span className="text-[#F8FAFC]">{"("}</span>
                  <span className="text-[#615FFF]">message</span>
                  <span className="text-[#F8FAFC]">{");"}</span>
                </div>

                {/* Línea 12 */}
                <div className={`${isLineAnimated(11) ? 'animate-lineAppear' : 'opacity-0'}`}>
                  <span className="text-[#F8FAFC]">{"})"}</span>
                </div>
              </code>
            </pre>
          </div>
        </div>
      </CustomScrollContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
