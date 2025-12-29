import React, { useState } from 'react'
import Button from '../components/button'
import { useToast } from '../contexts/useToast'
import axios from 'axios'

const Home = () => {
  const [rawText, setRawText] = useState('')
  const [customInstructions, setCustomInstructions] = useState('')
  const [extractedUrls, setExtractedUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const extractUrls = () => {
    const urlPattern = /(https?:\/\/)?(x\.com|twitter\.com)\/\S+/g
    const matches = rawText.match(urlPattern) || []
    
    const normalizedUrls = matches.map(url => {
      if (!url.startsWith('http')) {
        return `https://${url}`
      }
      return url
    })

    const uniqueUrls = [...new Set(normalizedUrls)]
    
    setExtractedUrls(uniqueUrls)
  }

  const handleClear = () => {
    setRawText('')
    setCustomInstructions('')
    setExtractedUrls([])
  }

  const handleReplyToTweets = async () => {
    extractUrls();
    setIsLoading(true)
    try {
      const res = await axios.post("http://localhost:3002/api/reply", {
         tweetUrls: extractedUrls,
         customInstructions
      }, 
      {
        withCredentials: true
      });
      
      if(res.status === 200) {
        const { msg, successCount, failureCount } = res.data
        addToast(
          `${msg} | Success: ${successCount}, Failed: ${failureCount}`,
          'success'
        )
      }

    
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Failed to process tweets. Please try again.'
      addToast(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='home'>
      <div className='form-container'>
        <h1>Paste Tweet URLs</h1>
        
        <textarea
          className='url-input'
          placeholder='Paste your text with tweet URLs here...'
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={8}
        />

        <label htmlFor='custom-instructions' className='instructions-label'>Custom Instructions</label>
        <textarea
          id='custom-instructions'
          className='url-input'
          placeholder='Enter any custom instructions for the replies...'
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          rows={4}
        />

        <div className='button-group'>
          <Button onClick={handleReplyToTweets} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Reply to tweets'}
          </Button>
          <Button onClick={handleClear} disabled={isLoading}>Clear</Button>
        </div>

      </div>
    </div>
  )
}

export default Home;