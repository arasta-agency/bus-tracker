import { ChatMessage, CriticalBroadcast, BroadcastTargetType, BroadcastUrgency } from '../types';

const STORAGE_KEY_MESSAGES = 'school_bus_realtime_messages_v1';
const STORAGE_KEY_BROADCASTS = 'school_bus_realtime_broadcasts_v1';
const CHANNEL_NAME = 'school_bus_messenger_v1';

// Initial pre-seeded messages showcasing realistic parent-admin dialogues
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_init_1',
    senderId: 'usr_parent_stu_1',
    senderName: 'سارا عەلی',
    senderRole: 'parent',
    parentEmail: 'sara.ali@example.com',
    parentPhone: '0750 339 3912',
    studentId: 'stu_1',
    studentName: 'ئاریا کاروان',
    busId: 'bus_104',
    busNumber: 'پاسی ١٠٤',
    content: 'سڵاو لە بەڕێوەبەرایەتی. ئایا پاسی ١٠٤ ئەمڕۆ لە کاتی ئاسایی خۆیدا دەگاتە گەڕەکی دڵۆپە؟',
    timestamp: '07:18 AM',
    createdAt: Date.now() - 1000 * 60 * 45,
    read: true,
    type: 'inquiry',
  },
  {
    id: 'msg_init_2',
    senderId: 'usr_manager_vance',
    senderName: 'د. کەنار محەمەد (بەڕێوەبەرایەتی)',
    senderRole: 'manager',
    parentEmail: 'sara.ali@example.com',
    studentId: 'stu_1',
    studentName: 'ئاریا کاروان',
    busId: 'bus_104',
    busNumber: 'پاسی ١٠٤',
    content: 'سڵاو دایکی ئاریا خان. بەڵێ، پاسی ١٠٤ ڕێڕەوەکەی کورتکراوەتەوە و کاتژمێر ٠٧:٣٥ دەگاتە بەردەم ماڵتان.',
    timestamp: '07:22 AM',
    createdAt: Date.now() - 1000 * 60 * 40,
    read: true,
    type: 'reply',
  },
  {
    id: 'msg_init_3',
    senderId: 'usr_parent_stu_2',
    senderName: 'ڕێبوار ئەحمەد',
    senderRole: 'parent',
    parentEmail: 'rebwar.a@example.com',
    parentPhone: '0750 774 7741',
    studentId: 'stu_2',
    studentName: 'دیار ڕێبوار',
    busId: 'bus_104',
    busNumber: 'پاسی ١٠٤',
    content: 'دیار ئەمڕۆ دەرمانی هەستیاری لە جانتاکەیدایە. تکایە ئاگاداری بن لە کاتی گەیشتن.',
    timestamp: '07:25 AM',
    createdAt: Date.now() - 1000 * 60 * 35,
    read: false,
    type: 'inquiry',
  },
];

const INITIAL_BROADCASTS: CriticalBroadcast[] = [
  {
    id: 'bcast_init_1',
    title: 'سیستمی چاودێری ڕاستەوخۆ چالاکە',
    content: 'سەرجەم پاسەکان بەپێی ئەلگۆریتمی ڕێکخراو کەوتوونەتە ڕێ. تکایە چاودێری ئاگاداری ١ خولەک پێش گەیشتن بن.',
    senderName: 'ژووری کۆنتڕۆڵی قوتابخانە',
    targetType: 'all_parents',
    urgency: 'general',
    timestamp: '07:05 AM',
    createdAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: 'bcast_init_2',
    title: 'ئاگاداری هاتووچۆ لە شەقامی پێشەوا (ڕانیە)',
    content: 'بەهۆی کارکردن لە شەقامی پێشەوا، پاسی ١٠٤ لە شەقامی ڕاستی دەسووڕێتەوە. کاتی گەیشتن بۆ هەموو وێستگەکان نوێکرایەوە.',
    senderName: 'بەڕێوەبەری هاتوچۆ و سەلامەتی',
    targetType: 'bus_group',
    targetBusId: 'bus_104',
    targetBusNumber: 'پاسی ١٠٤',
    urgency: 'important',
    timestamp: '07:15 AM',
    createdAt: Date.now() - 1000 * 60 * 50,
  },
];

class RealtimeMessagingService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(event: { type: string; payload: any }) => void> = new Set();

  constructor() {
    this.initStorage();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          if (event.data) {
            this.notifyListeners(event.data);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not supported or blocked:', err);
      }
    }
  }

  private initStorage() {
    if (typeof window === 'undefined') return;
    try {
      if (!localStorage.getItem(STORAGE_KEY_MESSAGES)) {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(INITIAL_MESSAGES));
      }
      if (!localStorage.getItem(STORAGE_KEY_BROADCASTS)) {
        localStorage.setItem(STORAGE_KEY_BROADCASTS, JSON.stringify(INITIAL_BROADCASTS));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  public getMessages(): ChatMessage[] {
    if (typeof window === 'undefined') return INITIAL_MESSAGES;
    try {
      const data = localStorage.getItem(STORAGE_KEY_MESSAGES);
      return data ? JSON.parse(data) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  }

  public getBroadcasts(): CriticalBroadcast[] {
    if (typeof window === 'undefined') return INITIAL_BROADCASTS;
    try {
      const data = localStorage.getItem(STORAGE_KEY_BROADCASTS);
      return data ? JSON.parse(data) : INITIAL_BROADCASTS;
    } catch {
      return INITIAL_BROADCASTS;
    }
  }

  private saveMessages(messages: ChatMessage[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save messages:', e);
    }
  }

  private saveBroadcasts(broadcasts: CriticalBroadcast[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_BROADCASTS, JSON.stringify(broadcasts));
    } catch (e) {
      console.warn('Failed to save broadcasts:', e);
    }
  }

  private notifyListeners(event: { type: string; payload: any }) {
    this.listeners.forEach((fn) => {
      try {
        fn(event);
      } catch (e) {
        console.error('Error in message listener:', e);
      }
    });
  }

  private broadcastToTabs(event: { type: string; payload: any }) {
    this.notifyListeners(event);
    if (this.channel) {
      try {
        this.channel.postMessage(event);
      } catch (err) {
        console.warn('Channel postMessage failed:', err);
      }
    }
  }

  public subscribe(callback: (event: { type: string; payload: any }) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  // Parent sends quick inquiry to school administrators
  public sendInquiry(params: {
    senderId: string;
    senderName: string;
    parentEmail: string;
    parentPhone?: string;
    studentId: string;
    studentName: string;
    busId: string;
    busNumber: string;
    content: string;
  }): ChatMessage {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      senderId: params.senderId,
      senderName: params.senderName,
      senderRole: 'parent',
      parentEmail: params.parentEmail,
      parentPhone: params.parentPhone,
      studentId: params.studentId,
      studentName: params.studentName,
      busId: params.busId,
      busNumber: params.busNumber,
      content: params.content.trim(),
      timestamp: timeStr,
      createdAt: Date.now(),
      read: false,
      type: 'inquiry',
    };

    const current = this.getMessages();
    const updated = [newMsg, ...current];
    this.saveMessages(updated);

    this.broadcastToTabs({
      type: 'NEW_INQUIRY',
      payload: newMsg,
    });

    return newMsg;
  }

  // Administrator replies to a specific parent/inquiry
  public replyToInquiry(params: {
    senderId: string;
    senderName: string;
    parentEmail: string;
    studentId?: string;
    studentName?: string;
    busId?: string;
    busNumber?: string;
    content: string;
  }): ChatMessage {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const replyMsg: ChatMessage = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      senderId: params.senderId,
      senderName: params.senderName,
      senderRole: 'manager',
      parentEmail: params.parentEmail,
      studentId: params.studentId,
      studentName: params.studentName,
      busId: params.busId,
      busNumber: params.busNumber,
      content: params.content.trim(),
      timestamp: timeStr,
      createdAt: Date.now(),
      read: false,
      type: 'reply',
    };

    const current = this.getMessages();
    // Also mark earlier inquiries from this parent as read
    const updated = [
      replyMsg,
      ...current.map((m) =>
        m.parentEmail?.toLowerCase() === params.parentEmail.toLowerCase() ? { ...m, read: true } : m
      ),
    ];
    this.saveMessages(updated);

    this.broadcastToTabs({
      type: 'NEW_REPLY',
      payload: replyMsg,
    });

    return replyMsg;
  }

  // Administrator broadcasts a critical or urgent update to targeted parent groups
  public sendBroadcast(params: {
    title: string;
    content: string;
    senderName: string;
    targetType: BroadcastTargetType;
    targetBusId?: string;
    targetBusNumber?: string;
    targetGrade?: string;
    urgency: BroadcastUrgency;
  }): CriticalBroadcast {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newBroadcast: CriticalBroadcast = {
      id: `bcast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: params.title.trim(),
      content: params.content.trim(),
      senderName: params.senderName,
      targetType: params.targetType,
      targetBusId: params.targetBusId,
      targetBusNumber: params.targetBusNumber,
      targetGrade: params.targetGrade,
      urgency: params.urgency,
      timestamp: timeStr,
      createdAt: Date.now(),
    };

    const currentBroadcasts = this.getBroadcasts();
    const updatedBroadcasts = [newBroadcast, ...currentBroadcasts];
    this.saveBroadcasts(updatedBroadcasts);

    // Also record a broadcast message in chat history so parents see it in communications
    const broadcastChatMsg: ChatMessage = {
      id: `msg_${newBroadcast.id}`,
      senderId: 'manager_dispatch',
      senderName: params.senderName,
      senderRole: 'manager',
      title: params.title.trim(),
      content: params.content.trim(),
      timestamp: timeStr,
      createdAt: Date.now(),
      read: false,
      type: 'broadcast',
      broadcastTarget: params.targetType,
      targetBusId: params.targetBusId,
      targetBusNumber: params.targetBusNumber,
      targetGrade: params.targetGrade,
      urgency: params.urgency,
    };

    const currentMessages = this.getMessages();
    this.saveMessages([broadcastChatMsg, ...currentMessages]);

    this.broadcastToTabs({
      type: 'CRITICAL_BROADCAST',
      payload: newBroadcast,
    });

    return newBroadcast;
  }

  // Mark all messages for a specific conversation/parent as read
  public markAsRead(parentEmail: string) {
    const current = this.getMessages();
    let hasChanges = false;
    const updated = current.map((m) => {
      if (m.parentEmail?.toLowerCase() === parentEmail.toLowerCase() && !m.read) {
        hasChanges = true;
        return { ...m, read: true };
      }
      return m;
    });

    if (hasChanges) {
      this.saveMessages(updated);
      this.broadcastToTabs({
        type: 'MESSAGES_READ',
        payload: { parentEmail },
      });
    }
  }

  // Mark all broadcasts as read
  public markBroadcastsAsRead() {
    const current = this.getMessages();
    const updated = current.map((m) => (m.type === 'broadcast' ? { ...m, read: true } : m));
    this.saveMessages(updated);
  }
}

export const realtimeMessenger = new RealtimeMessagingService();
