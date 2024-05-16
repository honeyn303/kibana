import expect from '@kbn/expect';
import { ServiceParams, SubActionConnector } from '@kbn/actions-plugin/server';
import {GeminiConnector} from 'x-pack/plugins/stack_connectors/server/connector_types/gemini/gemini';
import {ActionsConfigurationUtilities} from 'x-pack/plugins/actions/server/actions_config';
import {
    Config,
    Secrets
  } from 'x-pack/plugins/stack_connectors/common/gemini/types'
  import {
    RunActionParamsSchema,
    InvokeAIActionParamsSchema,
    RunApiLatestResponseSchema,
  }from 'x-pack/plugins/stack_connectors/common/gemini/schema'
import { DashboardActionParamsSchema } from 'x-pack/plugins/stack_connectors/common/gemini/schema'
import { SUB_ACTION } from 'x-pack/plugins/stack_connectors/common/gemini/constants'
import { MockedLogger } from '@kbn/logging-mocks';

describe('GeminiConnector', () => {

    // The constructor sets the necessary properties from the provided ServiceParams.
    it('should set the necessary properties from the provided ServiceParams', () => {
      const params = {
        connector: { id: '123', type: 'gemini' },
        config: { apiUrl: 'https://api.example.com', defaultModel: 'model1' , gcpRegion: 'us-central1',
            gcpProjectID: 'demo'
        },
        configurationUtilities: {} as ActionsConfigurationUtilities,
        logger: {} as MockedLogger,
        secrets: {} as Secrets,
        services: {} as ServiceParams<Config, Secrets>,
        request: {}
      };

      const connector = new GeminiConnector(params);

      expect(connector.getSubActions).equal(params.connector);
      expect(connector.logger).equal(params.logger);
      expect(connector.config).equal(params.config);
      expect(connector.secrets).equal(params.secrets);
      expect(connector.configurationUtilities).equal(params.configurationUtilities);
      expect(connector.kibanaRequest).equal(params.request);
    });

        // The registerSubActions method registers the expected sub-actions with their respective methods and schemas.
        it('should register the expected sub-actions with their respective methods and schemas', () => {
            // Mock the necessary dependencies
            const params = {
              connector: { id: '123', type: '.gemini' },
              config: { apiUrl: 'https://gemini-api.com', defaultModel: 'default-model', gcpRegion: 'us-central1',
              gcpProjectID: 'demo' },
              configurationUtilities: {} as ActionsConfigurationUtilities,
              logger: {} as MockedLogger,
              secrets: {} as Secrets,
            };
      
            // Create an instance of GeminiConnector
            const geminiConnector = new GeminiConnector(params);
      
            // Assert that the sub-actions are registered correctly
            expect(geminiConnector.registerSubAction).to({
              name: SUB_ACTION.RUN,
              method: 'runApi',
              schema: RunActionParamsSchema,
            });
            expect(geminiConnector.registerSubAction).toHaveBeenCalledWith({
              name: SUB_ACTION.DASHBOARD,
              method: 'getDashboard',
              schema: DashboardActionParamsSchema,
            });
            expect(geminiConnector.registerSubAction).toHaveBeenCalledWith({
              name: SUB_ACTION.TEST,
              method: 'runTestApi',
              schema: RunActionParamsSchema,
            });
            expect(geminiConnector.registerSubAction).toHaveBeenCalledWith({
              name: SUB_ACTION.INVOKE_AI,
              method: 'invokeAI',
              schema: InvokeAIActionParamsSchema,
            });
            expect(geminiConnector.registerSubAction).toHaveBeenCalledWith({
              name: SUB_ACTION.INVOKE_STREAM,
              method: 'invokeStream',
              schema: InvokeAIActionParamsSchema,
            });
          });
    
        // The runTestApi method makes a POST request to the external API endpoint and returns the response data.
        it('should make a POST request to the external API endpoint and return the response data', async () => {
            // Mock the necessary dependencies and setup the test environment
      
            // Mock the axiosInstance and its response
            const axiosInstanceMock = jest.spyOn(GeminiConnector, 'axiosInstance', 'get');
            axiosInstanceMock.mockReturnValue({
              post: jest.fn().mockResolvedValue({
                data: {
                  candidates: [
                    {
                      content: {
                        parts: [
                          {
                            text: 'Response data',
                          },
                        ],
                      },
                    },
                  ],
                },
              }),
            });
      
            // Mock the request parameters
            const requestParams = {
              url: 'https://example.com/api/endpoint',
              method: 'post',
              data: JSON.stringify({ messages: ['Hello'] }),
              headers: { 'Content-Type': 'application/json' },
              timeout: 5000,
              responseSchema: RunApiLatestResponseSchema,
            };
      
            // Execute the method under test
            const response = await connector.runTestApi(requestParams);
      
            // Assert the response
            expect(response).equal({ completion: 'Response data' });
      
            // Clean up the mocks
            axiosInstanceMock.mockRestore();
          });

              // The invokeAI method calls the runApi method and returns the response message.
    it('should call runApi method and return response message when invoking AI', async () => {
        // Mock the necessary dependencies and setup the test data
        const params = {
          messages: [
            { role: 'system', content: 'Be a good chatbot' },
            { role: 'user', content: 'Hello world' },
            { role: 'assistant', content: 'Hi, I am a good chatbot' },
            { role: 'user', content: 'What is 2+2?' },
          ],
        };
        const expectedResponse = { message: 'Response message' };
  
        // Mock the runApi method and set the expected response
        const runApiMock = jest.fn().mockResolvedValue(expectedResponse);
        const GeminiConnector = require('./GeminiConnector').GeminiConnector;
        GeminiConnector.prototype.runApi = runApiMock;
  
        // Create an instance of GeminiConnector and invoke the invokeAI method
        const connector = new GeminiConnector({});
        const response = await connector.invokeAI(params);
  
        // Assert that the runApi method was called with the correct parameters
        expect(runApiMock).toHaveBeenCalledWith({
          url: expect.any(String),
          method: 'post',
          data: JSON.stringify(params),
          headers: {
            'Authorization': expect.any(String),
            'Content-Type': 'application/json',
          },
          timeout: expect.any(Number),
          responseSchema: expect.any(Object),
        });
  
        // Assert that the response message is correct
        expect(response).equal(expectedResponse);
      });

          // The runApi method makes a POST request to the external API endpoint and returns the response data.
    it('should make a POST request to the external API endpoint and return the response data', async () => {
        // Mock dependencies and setup
        const params = {
          url: 'mocked-url',
          method: 'post',
          data: 'mocked-data',
          responseSchema: RunApiLatestResponseSchema,
          headers: { 'Content-Type': 'application/json' },
          timeout: 120000,
        };
        const response = { data: { candidates: [{ content: { parts: [{ text: 'mocked-completion' }] } }] } };
        const requestMock = jest.fn().mockResolvedValue(response);
        const axiosInstanceMock = { request: requestMock };
        const loggerMock = { debug: jest.fn() };
        const configurationUtilitiesMock = { ensureUriAllowed: jest.fn() };
        const geminiConnector = new GeminiConnector({
          connector: { id: 'mocked-id', type: 'mocked-type' },
          config: { apiUrl: 'mocked-api-url', defaultModel: 'mocked-default-model' },
          secrets: { accessToken: 'mocked-access-token' },
          logger: loggerMock,
          configurationUtilities: configurationUtilitiesMock,
          services: {
            savedObjectsClient: {},
            scopedClusterClient: {},
          },
          axios: axiosInstanceMock,
        });
  
        // Execute the method
        const result = await geminiConnector.runApi(params);
  
        // Verify the request is made correctly
        expect(requestMock).toHaveBeenCalledWith({
          url: 'mocked-url',
          method: 'post',
          data: 'mocked-data',
          headers: { 'Content-Type': 'application/json' },
          timeout: 120000,
        });
  
        // Verify the response is validated and returned correctly
        expect(result).equal({ completion: 'mocked-completion' });
      });

          // The getDashboard method retrieves a dashboard from the Kibana server and returns whether it is available or not.
    it('should retrieve a dashboard and return availability status', async () => {
        // Mock dependencies and setup
        const savedObjectsClient = {
          get: jest.fn().mockResolvedValue({}),
          create: jest.fn().mockResolvedValue({}),
        };
        const logger = {
          info: jest.fn(),
          debug: jest.fn(),
        };
        const request = {};
        const config = {
          apiUrl: 'http://example.com',
          defaultModel: 'defaultModel',
          gcpRegion: 'gcpRegion',
          gcpProjectID: 'gcpProjectID',
        };
        const secrets = {
          accessToken: 'accessToken',
        };
        const services = {
          savedObjectsClient,
          scopedClusterClient: {},
        };
        const configurationUtilities = {
          ensureUriAllowed: jest.fn(),
        };
        const params = {
          connector: { id: 'connectorId', type: 'connectorType' },
          config,
          secrets,
          services,
          logger,
          configurationUtilities,
          request,
        };
  
        // Create instance of GeminiConnector
        const geminiConnector = new GeminiConnector(params);
  
        // Mock initDashboard function
        const initDashboardMock = jest.spyOn(geminiConnector, 'initDashboard');
        initDashboardMock.mockResolvedValue({ success: true });
  
        // Call getDashboard method
        const result = await geminiConnector.getDashboard({ dashboardId: 'dashboardId' });
  
        // Assertions
        expect(initDashboardMock).toHaveBeenCalledWith({
          logger,
          savedObjectsClient,
          dashboardId: 'dashboardId',
          genAIProvider: 'Gemini',
        });
        expect(result).equal({ available: true });
      });
});
