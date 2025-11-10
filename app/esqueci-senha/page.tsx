"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function EsqueciSenhaPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      // Aqui você faria a chamada para sua API de recuperação de senha
      // Por enquanto, vamos simular o envio do email

      // Simulando delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setEmailSent(true);
      toast.success("Email enviado!", {
        description: "Verifique sua caixa de entrada.",
      });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast.error("Erro ao enviar email", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/login"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para login
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
          </div>

          {!emailSent ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Esqueceu sua senha?
                </h2>
                <p className="text-gray-600">
                  Sem problemas! Digite seu email e enviaremos instruções para
                  redefinir sua senha.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar instruções"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Email enviado!
              </h2>
              <p className="text-gray-600 mb-6">
                Enviamos instruções para recuperação de senha para seu email.
                Verifique sua caixa de entrada e spam.
              </p>

              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Voltar para login
                </Link>

                <button
                  onClick={() => setEmailSent(false)}
                  className="block w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200"
                >
                  Enviar novamente
                </button>
              </div>
            </div>
          )}

          {!emailSent && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Dica:</strong> O email de recuperação pode levar
                alguns minutos para chegar. Não esqueça de verificar a pasta de
                spam!
              </p>
            </div>
          )}
        </div>

        {!emailSent && (
          <p className="mt-6 text-center text-sm text-gray-600">
            Lembrou sua senha?{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Fazer login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
