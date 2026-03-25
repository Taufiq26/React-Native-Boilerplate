import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { CheckCircle2, MailCheck } from 'lucide-react-native';

export type IconType = 'check' | 'mail';

interface SuccessModalProps {
  visible: boolean;
  title: string;
  message: ReactNode;
  buttonText?: string;
  icon?: IconType;
  onConfirm: () => void;
}

export function SuccessModal({
  visible,
  title,
  message,
  buttonText = 'Continue',
  icon = 'check',
  onConfirm,
}: SuccessModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center px-6">
        <View className="bg-white w-full rounded-[28px] p-8 items-center shadow-2xl">
          <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center mb-6">
            {icon === 'mail' ? (
              <MailCheck size={40} color="#0a4c81" strokeWidth={2} />
            ) : (
              <CheckCircle2 size={40} color="#0a4c81" strokeWidth={2} />
            )}
          </View>
          
          <Text className="text-2xl font-extrabold text-zinc-800 text-center mb-3">
            {title}
          </Text>
          
          <Text className="text-[15px] text-zinc-500 text-center mb-8 leading-6">
            {message}
          </Text>
          
          <TouchableOpacity
            onPress={onConfirm}
            activeOpacity={0.8}
            className="w-full bg-[#0a4c81] py-4 rounded-[14px] items-center justify-center shadow-sm"
          >
            <Text className="text-white text-[16px] font-bold tracking-wide">
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
