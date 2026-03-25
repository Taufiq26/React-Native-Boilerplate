import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AlertTriangle, Info } from 'lucide-react-native';

export type WarningIconType = 'triangle' | 'info';

interface WarningModalProps {
  visible: boolean;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  icon?: WarningIconType;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function WarningModal({
  visible,
  title,
  message,
  confirmText = 'Proceed',
  cancelText = 'Cancel',
  icon = 'triangle',
  onConfirm,
  onCancel,
}: WarningModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center px-6">
        <View className="bg-white w-full rounded-[28px] p-8 items-center shadow-2xl">
          <View className="w-20 h-20 rounded-full bg-amber-50 items-center justify-center mb-6">
            {icon === 'info' ? (
              <Info size={40} color="#f59e0b" strokeWidth={2} />
            ) : (
              <AlertTriangle size={40} color="#f59e0b" strokeWidth={2} />
            )}
          </View>
          
          <Text className="text-2xl font-extrabold text-zinc-800 text-center mb-3">
            {title}
          </Text>
          
          <Text className="text-[15px] text-zinc-500 text-center mb-8 leading-6">
            {message}
          </Text>
          
          <View className={`w-full ${onCancel ? 'flex-row items-center justify-between' : ''}`}>
            {onCancel && (
              <TouchableOpacity
                onPress={onCancel}
                activeOpacity={0.7}
                className="flex-1 bg-zinc-100 py-4 rounded-[14px] items-center justify-center mr-3"
              >
                <Text className="text-zinc-600 text-[16px] font-bold tracking-wide">
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={0.8}
              className={`${onCancel ? 'flex-1 ml-3 bg-amber-500' : 'w-full bg-amber-500'} py-4 rounded-[14px] items-center justify-center shadow-sm`}
            >
              <Text className="text-white text-[16px] font-bold tracking-wide">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
