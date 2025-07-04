import { useState } from 'react'
import { Mail, Copy, RefreshCw, X } from 'lucide-react'

const MessageGenerator = ({ selectedJob, onClose }) => {
  const [messageType, setMessageType] = useState('followup')
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [rejectionEmail, setRejectionEmail] = useState('')
  const [copied, setCopied] = useState(false);

  const generateMessage = async () => {
    if (!selectedJob) return

    setIsGenerating(true)
    
    try {
      // This is a mock implementation - in production, you'd call OpenAI API
      const message = await generateFollowUpMessage(selectedJob, messageType, rejectionEmail)
      setGeneratedMessage(message)
    } catch (error) {
      console.error('Error generating message:', error)
      setGeneratedMessage('Error generating message. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateFollowUpMessage = async (job, type, rejectionText = '') => {
    // Mock AI response - replace with actual OpenAI API call
    const templates = {
      followup: `Hi ${job.recruiterEmail ? job.recruiterEmail.split('@')[0] : '[Recruiter Name]'},

I hope this email finds you well. I wanted to follow up on my application for the ${job.role} position at ${job.company}.

I remain very interested in this opportunity and would appreciate any updates on the status of my application. I'm excited about the possibility of contributing to ${job.company}'s team and would be grateful for any feedback or next steps.

Thank you for your time and consideration.

Best regards,
[Your Name]`,

      cold: `Hi ${job.recruiterEmail ? job.recruiterEmail.split('@')[0] : '[Name]'},

I hope you're having a great day. I'm reaching out because I'm very interested in opportunities at ${job.company}, particularly in ${job.role} positions.

I have experience in [relevant skills] and am passionate about [relevant interests]. I believe I could bring valuable contributions to your team.

Would you be open to a brief conversation about potential opportunities or could you point me in the right direction for applying to relevant positions?

Thank you for your time.

Best regards,
[Your Name]`,

      recovery: `Hi ${job.recruiterEmail ? job.recruiterEmail.split('@')[0] : '[Recruiter Name]'},

Thank you for the update regarding the ${job.role} position at ${job.company}. I appreciate you taking the time to let me know about the current situation.

While I understand that the position has been filled, I wanted to express my continued interest in ${job.company}. If any similar opportunities arise in the future, I would be very grateful to be considered.

I'm particularly drawn to ${job.company}'s [mention something specific about the company] and would love to stay in touch for future possibilities.

Thank you again for the opportunity to be part of your process.

Best regards,
[Your Name]`
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return templates[type] || templates.followup
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
  };

  if (!selectedJob) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <Mail className="mx-auto text-gray-400 mb-4" size={32} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Message Generator</h3>
          <p className="text-gray-600">Select a job to generate a follow-up message</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Generate Follow-up</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Type
          </label>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="input-field"
          >
            <option value="followup">Post-interview Follow-up</option>
            <option value="cold">Cold Outreach</option>
            <option value="recovery">Response to Rejection</option>
          </select>
        </div>

        {messageType === 'recovery' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Rejection Email (Optional)
            </label>
            <textarea
              value={rejectionEmail}
              onChange={(e) => setRejectionEmail(e.target.value)}
              rows={4}
              className="input-field"
              placeholder="Paste the rejection email to get a more personalized response..."
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={generateMessage}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2 flex-1"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" size={16} />
                Generating...
              </>
            ) : (
              <>
                <Mail size={16} />
                Generate Message
              </>
            )}
          </button>
        </div>

        {generatedMessage && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">Generated Message</h4>
              <button
                onClick={copyToClipboard}
                className="btn-secondary text-sm flex items-center gap-1"
              >
                <Copy size={14} />
                Copy
              </button>
            </div>
            
            {copied && (
              <div className="text-green-600 text-sm mb-2 flex items-center gap-1">
                <Copy size={14} />
                Copied to clipboard!
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                {generatedMessage}
              </pre>
            </div>

            <div className="text-xs text-gray-500">
              <p>💡 Tip: Personalize this message with specific details about your experience and the company before sending.</p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-4">
          <p><strong>Selected Job:</strong> {selectedJob.company} - {selectedJob.role}</p>
          {selectedJob.recruiterEmail && (
            <p><strong>Recruiter:</strong> {selectedJob.recruiterEmail}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageGenerator 