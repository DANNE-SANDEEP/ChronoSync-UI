import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface ChatSectionProps {
  userRole: 'student' | 'faculty';
}

const studentConversations: Conversation[] = [
  {
    id: '1',
    name: 'Dr. Sharma',
    role: 'Computer Science Faculty',
    lastMessage: 'Sure, I can help you with that concept.',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: 'DS',
    online: true,
  },
  {
    id: '2',
    name: 'Prof. Kumar',
    role: 'Algorithms Faculty',
    lastMessage: 'Please submit your assignment by Friday.',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'PK',
    online: false,
  },
  {
    id: '3',
    name: 'Prof. Verma',
    role: 'Web Development Faculty',
    lastMessage: 'Great work on the project!',
    timestamp: '2 days ago',
    unread: 0,
    avatar: 'PV',
    online: true,
  },
  {
    id: '4',
    name: 'Dr. Singh',
    role: 'DBMS Faculty',
    lastMessage: 'Let\'s discuss this in our next meeting.',
    timestamp: '3 days ago',
    unread: 1,
    avatar: 'DS',
    online: false,
  },
  {
    id: '5',
    name: 'Dr. Reddy',
    role: 'Software Engineering Faculty',
    lastMessage: 'The exam schedule has been updated.',
    timestamp: 'Last week',
    unread: 0,
    avatar: 'DR',
    online: false,
  },
];

const facultyConversations: Conversation[] = [
  {
    id: '1',
    name: 'Rahul Verma',
    role: 'CSE-3A Student',
    lastMessage: 'Thank you sir, I understand it now.',
    timestamp: '11:45 AM',
    unread: 1,
    avatar: 'RV',
    online: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'CSE-3B Student',
    lastMessage: 'Can I submit the assignment tomorrow?',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'PS',
    online: false,
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'CSE-3A Student',
    lastMessage: 'I have a doubt about linked lists.',
    timestamp: '2 days ago',
    unread: 3,
    avatar: 'AP',
    online: true,
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    role: 'CSE-3C Student',
    lastMessage: 'Thanks for the clarification!',
    timestamp: '3 days ago',
    unread: 0,
    avatar: 'SG',
    online: false,
  },
  {
    id: '5',
    name: 'Arjun Singh',
    role: 'CSE-3B Student',
    lastMessage: 'Could you please review my project?',
    timestamp: 'Last week',
    unread: 0,
    avatar: 'AS',
    online: true,
  },
];

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Good morning! I have a doubt regarding the tree traversal algorithms.',
      sender: 'other',
      timestamp: '10:15 AM',
      read: true,
    },
    {
      id: '2',
      text: 'Good morning! Sure, what would you like to know?',
      sender: 'me',
      timestamp: '10:20 AM',
      read: true,
    },
    {
      id: '3',
      text: 'I\'m confused about the difference between preorder and postorder traversal.',
      sender: 'other',
      timestamp: '10:25 AM',
      read: true,
    },
    {
      id: '4',
      text: 'Sure, I can help you with that concept. In preorder, we visit root first, then left subtree, then right. In postorder, we visit left, then right, then root.',
      sender: 'me',
      timestamp: '10:30 AM',
      read: true,
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Hello Professor, I wanted to discuss the upcoming assignment.',
      sender: 'other',
      timestamp: 'Yesterday 3:00 PM',
      read: true,
    },
    {
      id: '2',
      text: 'Of course! What would you like to know?',
      sender: 'me',
      timestamp: 'Yesterday 3:15 PM',
      read: true,
    },
    {
      id: '3',
      text: 'Please submit your assignment by Friday.',
      sender: 'me',
      timestamp: 'Yesterday 3:20 PM',
      read: true,
    },
  ],
  '3': [
    {
      id: '1',
      text: 'Hi! I just submitted the web development project.',
      sender: 'other',
      timestamp: '2 days ago 2:00 PM',
      read: true,
    },
    {
      id: '2',
      text: 'Great work on the project!',
      sender: 'me',
      timestamp: '2 days ago 4:30 PM',
      read: true,
    },
  ],
};

export function ChatSection({ userRole }: ChatSectionProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = userRole === 'student' ? studentConversations : facultyConversations;
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedConversation ? mockMessages[selectedConversation] || [] : [];
  const currentConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-200px)]">
      <Card className="h-full flex flex-col lg:flex-row overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        {/* Conversations List */}
        <div className="w-full lg:w-96 border-r dark:border-gray-700 flex flex-col">
          <CardHeader className="border-b dark:border-gray-700 pb-4">
            <CardTitle className="dark:text-white">Messages</CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </CardHeader>

          <ScrollArea className="flex-1">
            <div className="divide-y dark:divide-gray-700">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedConversation === conversation.id
                      ? 'bg-orange-50 dark:bg-gray-700 border-l-4 border-l-orange-500'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-purple-600 text-white">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="truncate dark:text-white">{conversation.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {conversation.role}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="bg-orange-500 text-white hover:bg-orange-600 ml-2">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        {selectedConversation && currentConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-purple-600 text-white">
                      {currentConversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {currentConversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div>
                  <h3 className="dark:text-white">{currentConversation.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentConversation.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4 max-w-4xl mx-auto">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'me'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'me' ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-300 mb-1"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-300 mb-1"
                >
                  <Smile className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  size="icon"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
