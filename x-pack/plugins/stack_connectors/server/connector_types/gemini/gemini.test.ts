<<<<<<< HEAD
import {
  AxiosResponse,
  AxiosHeaders
} from 'axios';
import { ActionsConfigurationUtilities } from '@kbn/actions-plugin/server/actions_config';
import { ConnectorTokenClient } from 'x-pack/plugins/actions/server/lib/connector_token_client';
=======
import { GeminiConnector } from './gemini';
import { ServiceParams } from '@kbn/actions-plugin/server';
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd
import {
  Config,
  Secrets,
  RunActionParams,
<<<<<<< HEAD
  RunActionResponse,
  RunApiLatestResponse,
  InvokeAIActionParams
} from '../../../common/gemini/types';
import { GeminiConnector } from './gemini';
import type { Headers } from 'packages/core/http/core-http-server/src/router/headers';
import {
  KibanaRequest,
  SavedObjectsClientContract,
  ElasticsearchClient,
  KibanaRequestEvents,
  IKibanaSocket,
} from '@kbn/core/server';
import { Logger } from '@kbn/logging';
import {
  RunApiLatestResponseSchema
} from 'x-pack/plugins/stack_connectors/common/gemini/schema';
import { ServiceParams } from '@kbn/actions-plugin/server';
import type {
    Services
  } from 'x-pack/plugins/actions/server/types';
=======
  RunActionResponse
} from '../../../common/gemini/types';
import { ActionsConfigurationUtilities } from '@kbn/actions-plugin/server/actions_config';
import { Logger } from '@kbn/logging';
  import type {
    Services
  } from 'x-pack/plugins/actions/server/types';
  import {
    KibanaRequest,
    SavedObjectsClientContract,
    ElasticsearchClient,
    KibanaRequestEvents,
    IKibanaSocket,
  } from '@kbn/core/server';
  import { ConnectorTokenClient } from 'x-pack/plugins/actions/server/lib/connector_token_client';
  import type { Headers } from 'packages/core/http/core-http-server/src/router/headers';
  import {
    AxiosResponse,
    AxiosHeaders
  } from 'axios';
import { RunApiResponse } from '@kbn/stack-connectors-plugin/common/gemini/types';
import { RunApiResponseSchema } from '@kbn/stack-connectors-plugin/common/gemini/schema';

>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd

jest.mock('@kbn/actions-plugin/server/sub_action_framework/helpers/validators', () => ({
  assertURL: jest.fn(),
}));

jest.mock('@kbn/actions-plugin/server', () => {
    const originalModule = jest.requireActual('@kbn/actions-plugin/server');
  
    return {
      ...originalModule,
      SubActionConnector: jest.fn().mockImplementation(
        (
          ...args // Capture constructor arguments
        ) => {
          const connectorInstance = new originalModule.SubActionConnector(...args);
          // Now you can mock the request method on the instance
          (connectorInstance.request as jest.MockedFunction<any>) = jest.fn(); 
          return connectorInstance;
        }
      ),
    };
  });
  
  

describe('GeminiConnector', () => {
  let connector: GeminiConnector;
  let mockServiceParams: ServiceParams<Config, Secrets>;

  const mockConfigurationUtilities: ActionsConfigurationUtilities = {
    isHostnameAllowed: jest.fn().mockReturnValue(true), // Always allow hostname
    isUriAllowed: jest.fn().mockReturnValue(true),       // Always allow URI
    isActionTypeEnabled: jest.fn().mockReturnValue(true), // Always enable action type
    ensureHostnameAllowed: jest.fn(),              // Empty implementation for now
    ensureUriAllowed: jest.fn(),                  // Empty implementation for now
    ensureActionTypeEnabled: jest.fn(),             // Empty implementation for now
    getSSLSettings: jest.fn(),                    // Empty implementation for now
    getProxySettings: jest.fn(),                   // Empty implementation for now
    getResponseSettings: jest.fn(),                 // Empty implementation for now
    getCustomHostSettings: jest.fn(),               // Empty implementation for now
    getMicrosoftGraphApiUrl: jest.fn().mockReturnValue('https://graph.microsoft.com/v1.0'), 
    getMicrosoftGraphApiScope: jest.fn().mockReturnValue('https://graph.microsoft.com/.default'), 
    getMicrosoftExchangeUrl: jest.fn().mockReturnValue('https://outlook.office.com/api/v2.0'), 
    getMaxAttempts: jest.fn().mockReturnValue(3),      
    validateEmailAddresses: jest.fn(),             
    enableFooterInEmail: jest.fn().mockReturnValue(true),  
    getMaxQueued: jest.fn().mockReturnValue(100),      
  };

  const mockLogger: Logger = {
    trace: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
    log: jest.fn(),
    isLevelEnabled: jest.fn().mockReturnValue(true), // Enable all levels by default
    get: jest.fn((...childContextPaths: string[]) => mockLogger), // Return the same mock for child loggers
  };

  const mockServices: Services = {
    savedObjectsClient: {} as SavedObjectsClientContract, // Empty mock object
    scopedClusterClient: {} as ElasticsearchClient,        // Empty mock object
    connectorTokenClient: {} as ConnectorTokenClient,      // Empty mock object
  };

  const mockHeaders: Headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer some-token',
    'X-Custom-Header': ['value1', 'value2'], // Multiple values
  };

  const mockAxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer some-token',
    'X-Custom-Header': ['value1', 'value2'],
});

  const mockKibanaRequest: KibanaRequest = {
    id: 'mock-request-id',
    uuid: 'mock-request-uuid',
    url: new URL('https://example.com/api/endpoint'),
    route: { path: '/api/endpoint', method: 'get', options: {
        authRequired:  "optional",
        xsrfRequired: false,
        access: "public",
        tags: ['readonly'],
        timeout: {
            payload: undefined,
            idleSocket: undefined
        },
    description: 'string'
        } 
    },
    headers: mockHeaders,
    isSystemRequest: false,
    isFakeRequest: false,
    isInternalApiRequest: false,
    socket: {} as IKibanaSocket, // You might need to mock this depending on your code's interaction with it
    events: {} as KibanaRequestEvents, // You might need to mock this too
    auth: {
      isAuthenticated: false
    },
    params: {},
    query: {},
    body: {},
  };
  
  

  beforeEach(() => {
    mockServiceParams = {
      connector: { id: 'Gemini-id', type: 'gemini' },
      configurationUtilities: mockConfigurationUtilities,
      config: {
        apiUrl: 'https://api.gemini.com',
        defaultModel: 'text-bison',
        gcpRegion: 'us-central1',
        gcpProjectID: 'my-project-12345',
      },
      secrets: {
<<<<<<< HEAD
        accessToken: 'fake-access-token',
=======
        credentialsJson: 'some-random-string' 
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd
      },
      logger: mockLogger,
      services: mockServices,
      request: mockKibanaRequest
    };

    connector = new GeminiConnector(mockServiceParams);
  });

  describe('getDashboard', () => {
    it('should return available: true when user has privileges', async () => {
      const dashboardId = 'some-dashboard-id';
      
      // Mock initDashboard to simulate a successful dashboard fetch
      jest.spyOn(connector, 'initDashboard' as any).mockResolvedValueOnce({ success: true });

      const response = await connector.getDashboard({ dashboardId });
      expect(response).toEqual({ available: true });
    });

    // Add a test for the case when the user doesn't have privileges
  });
  // ...tests for runTestApi
  // ...tests for runApi
  describe('runTestApi', () => {
    it('should send a formatted request to the API and return the response', async () => {
        const runActionParams: RunActionParams = {
            body: JSON.stringify({
                "messages": [{
                    "author": "user",
                    "content": "What is the capital of France?"
                }]
            }),
            model: 'test-model'
        };

<<<<<<< HEAD
        const mockApiResponse: AxiosResponse<RunApiLatestResponse> = {
=======
        const mockApiResponse: AxiosResponse<RunApiResponse> = {
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd
            data: {
                candidates: [{
                    content: {
                        parts: [{ text: 'Paris' }]
                    }
                }],
                usageMetadata : {
                    promptTokenCount: 4096,
                    candidatesTokenCount: 512,
                    totalTokenCount: 8192
                }
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: mockAxiosHeaders,
            },
        };

        // Mock the request function to simulate a successful API call
        //jest.spyOn(connector, 'request' as any).mockResolvedValueOnce(mockApiResponse);
              (connector as jest.MockedFunction<any>).mockResolvedValueOnce(mockApiResponse);


<<<<<<< HEAD
        const response = await connector.runTestApi(runActionParams);
=======
        const response = await connector.runApi(runActionParams);
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd

        // Assert that the request was made with the correct parameters
        expect(connector).toHaveBeenCalledWith({
            url: 'https://api.gemini.com/v1/projects/my-project-12345/locations/us-central1/publishers/google/models/test-model:generateContent',
            method: 'post',
            data: JSON.stringify([{ author: "user", content: "What is the capital of France?" }]),
            headers: {
                'Authorization': 'Bearer fake-access-token',
                'Content-Type': 'application/json'
            },
<<<<<<< HEAD
            responseSchema: RunApiLatestResponseSchema
=======
            responseSchema: RunApiResponseSchema
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd
        });
        
        // Assert the response
        expect(response).toEqual({ completion: 'Paris' });

    });

    // Add error handling tests here as well
  });

  describe('invokeAI', () => {
    it('should call runApi with the correct parameters and return the response', async () => {
<<<<<<< HEAD
      const invokeParams: InvokeAIActionParams = {
        messages: [{ role: 'user', content: 'Hello' }],
        model: 'my-model',
        temperature: 0.5,
=======
      const invokeParams: RunActionParams = {
        body: 'Hello',
        model: 'my-model',
        signal: 0.5,
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd
        timeout: 5000,
      };

      const mockRunApiResponse: RunActionResponse = {
        completion: 'Hi there!',
      };

      jest.spyOn(connector, 'runApi' as any).mockResolvedValueOnce(mockRunApiResponse);

<<<<<<< HEAD
      const result = await connector.invokeAI(invokeParams);

      expect(connector.runApi).toHaveBeenCalledWith({
        body: JSON.stringify({ messages: invokeParams.messages }),
=======
      const result = await connector.runApi(invokeParams);

      expect(connector.runApi).toHaveBeenCalledWith({
        body: JSON.stringify({ messages: invokeParams.body }),
>>>>>>> 41673a8f09504508fa289c0a132f1a31bee5d0dd
        model: invokeParams.model,
        timeout: invokeParams.timeout,
      });

      expect(result).toEqual({ message: mockRunApiResponse.completion });
    });
})
})