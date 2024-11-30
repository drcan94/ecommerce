"use client";

import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const SettingsPage: FC = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Ayarlar kaydedildi");
    } catch (error) {
      toast.error("Ayarlar kaydedilirken bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Newsletter Ayarları
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Newsletter gönderim ve görünüm ayarlarını yönetin
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Kaydet
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="sender">Gönderici</TabsTrigger>
          <TabsTrigger value="design">Tasarım</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Genel Ayarlar</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="defaultTemplate">Varsayılan Şablon</Label>
                <Input id="defaultTemplate" placeholder="Şablon seçin" />
              </div>
              <div>
                <Label htmlFor="defaultLanguage">Varsayılan Dil</Label>
                <Input id="defaultLanguage" placeholder="Türkçe" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sender" className="space-y-6 mt-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Gönderici Ayarları</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fromName">Gönderici Adı</Label>
                <Input id="fromName" placeholder="Şirket Adı" />
              </div>
              <div>
                <Label htmlFor="replyTo">Yanıt Email Adresi</Label>
                <Input
                  id="replyTo"
                  type="email"
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6 mt-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tasarım Ayarları</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="headerColor">Header Rengi</Label>
                <Input id="headerColor" type="color" className="h-10 w-20" />
              </div>
              <div>
                <Label htmlFor="footerText">Footer Metni</Label>
                <Input id="footerText" placeholder="Footer metni girin" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
