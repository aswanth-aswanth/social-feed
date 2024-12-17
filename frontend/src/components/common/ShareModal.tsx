import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';
import { MessageCircle as Discord, Instagram, MessagesSquare as Messenger  } from 'lucide-react';

interface ShareModalProps {
  url: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[340px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Share post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <TwitterShareButton url={url}>
              <div className="bg-[#E8F5FD] p-4 rounded-full">
                <TwitterIcon size={32} round />
              </div>
              <span className="mt-2 text-sm">Twitter</span>
            </TwitterShareButton>
          </div>

          <div className="flex flex-col items-center">
            <FacebookShareButton url={url}>
              <div className="bg-[#E7F3FF] p-4 rounded-full">
                <FacebookIcon size={32} round />
              </div>
              <span className="mt-2 text-sm">Facebook</span>
            </FacebookShareButton>
          </div>

          <div className="flex flex-col items-center">
            <RedditShareButton url={url}>
              <div className="bg-[#FFE8E8] p-4 rounded-full">
                <RedditIcon size={32} round />
              </div>
              <span className="mt-2 text-sm">Reddit</span>
            </RedditShareButton>
          </div>

          <div className="flex flex-col items-center">
            <a href="discord://" className="flex flex-col items-center">
              <div className="bg-[#E8E8FF] p-4 rounded-full">
                <Discord className="w-8 h-8 text-[#5865F2]" />
              </div>
              <span className="mt-2 text-sm">Discord</span>
            </a>
          </div>

          <div className="flex flex-col items-center">
            <WhatsappShareButton url={url}>
              <div className="bg-[#E8FFE8] p-4 rounded-full">
                <WhatsappIcon size={32} round />
              </div>
              <span className="mt-2 text-sm">WhatsApp</span>
            </WhatsappShareButton>
          </div>

          <div className="flex flex-col items-center">
            <FacebookMessengerShareButton url={url} appId="YOUR_FB_APP_ID">
              <div className="bg-[#E7F3FF] p-4 rounded-full">
                <Messenger className="w-8 h-8 text-[#0084FF]" />
              </div>
              <span className="mt-2 text-sm">Messenger</span>
            </FacebookMessengerShareButton>
          </div>

          <div className="flex flex-col items-center">
            <TelegramShareButton url={url}>
              <div className="bg-[#E8F5FD] p-4 rounded-full">
                <TelegramIcon size={32} round />
              </div>
              <span className="mt-2 text-sm">Telegram</span>
            </TelegramShareButton>
          </div>

          <div className="flex flex-col items-center">
            <a href="instagram://" className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-[#FFB8E8] to-[#FFE8B8] p-4 rounded-full">
                <Instagram className="w-8 h-8 text-[#E4405F]" />
              </div>
              <span className="mt-2 text-sm">Instagram</span>
            </a>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Page Link</p>
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <input 
              type="text" 
              value={url} 
              readOnly 
              className="bg-transparent flex-1 outline-none"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(url)}
              className="p-2 hover:bg-gray-200 rounded"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 