// src/app/(admin)/admin/newsletter/send/page.tsx
"use client";

import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/app/(admin)/admin/newsletter/_components/Editor";
import { toast } from "sonner";

const NewsletterPage: FC = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) {
      toast.error("Lütfen konu ve içerik alanlarını doldurun");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Newsletter gönderilemedi");
      }

      toast.success("Newsletter başarıyla gönderildi");
      // İsteğe bağlı: Formu temizle
      setSubject("");
      setContent("");
    } catch (error) {
      console.error("Newsletter gönderme hatası:", error);
      toast.error("Newsletter gönderilirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Newsletter Oluştur</h1>
          <p className="text-muted-foreground">
            İçeriğinizi oluşturun veya bir template kullanın
          </p>
        </div>
      </div>

      {/* İçerik Editörü */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="subject">Konu</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Newsletter konusu"
            />
          </div>

          <div>
            <Label>İçerik</Label>
            <div className="mt-2">
              <Editor
                onChange={setContent}
                initialContent={content}
                editable={true}
              />
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            } bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Gönderiliyor...
              </>
            ) : (
              "Gönder"
            )}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default NewsletterPage;
