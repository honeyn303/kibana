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
import { SubActionRequestParams, SubAction } from '@kbn/actions-plugin/server/sub_action_framework/types';
import { Type } from '@kbn/config-schema';
import { AxiosError, AxiosRequestHeaders, AxiosHeaderValue, AxiosResponse } from 'axios';
import { SavedObjectsCreateOptions, SavedObject, SavedObjectsBulkCreateObject, SavedObjectsBulkResponse, SavedObjectsCheckConflictsObject, SavedObjectsBaseOptions, SavedObjectsCheckConflictsResponse, SavedObjectsDeleteOptions, SavedObjectsBulkDeleteObject, SavedObjectsBulkDeleteOptions, SavedObjectsBulkDeleteResponse, SavedObjectsFindOptions, SavedObjectsFindResponse, SavedObjectsBulkGetObject, SavedObjectsGetOptions, SavedObjectsBulkResolveObject, SavedObjectsResolveOptions, SavedObjectsBulkResolveResponse, SavedObjectsResolveResponse, SavedObjectsUpdateOptions, SavedObjectsUpdateResponse, SavedObjectsBulkUpdateObject, SavedObjectsBulkUpdateOptions, SavedObjectsBulkUpdateResponse, SavedObjectsRemoveReferencesToOptions, SavedObjectsRemoveReferencesToResponse, SavedObjectsOpenPointInTimeOptions, SavedObjectsOpenPointInTimeResponse, SavedObjectsClosePointInTimeResponse, SavedObjectsCreatePointInTimeFinderOptions, SavedObjectsCreatePointInTimeFinderDependencies, ISavedObjectsPointInTimeFinder, SavedObjectsCollectMultiNamespaceReferencesObject, SavedObjectsCollectMultiNamespaceReferencesOptions, SavedObjectsCollectMultiNamespaceReferencesResponse, SavedObjectsUpdateObjectsSpacesObject, SavedObjectsUpdateObjectsSpacesOptions, SavedObjectsUpdateObjectsSpacesResponse } from '@kbn/core-saved-objects-api-server';
import { ClientOptions, Client } from '@elastic/elasticsearch';

describe('GeminiConnector', () => { 
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
                url: '',
                model: '',
                gcpRegion: '',
                gcpProjectID: '',
                registerSubActions: function (): void {
                    throw new Error('Function not implemented.');
                },
                getResponseErrorMessage: function (error: AxiosError<{ message?: string | undefined; }, any>): string {
                    throw new Error('Function not implemented.');
                },
                getDashboard: function ({ dashboardId, }: Readonly<{} & { dashboardId: string; }>): Promise<Readonly<{} & { available: boolean; }>> {
                    throw new Error('Function not implemented.');
                },
                runApiLatest: function (params: SubActionRequestParams<Readonly<{ candidates?: any; usageMetadata?: any; } & {}>>): Promise<Readonly<{ stop_reason?: string | undefined; usage?: Readonly<{} & { input_tokens: number; output_tokens: number; }> | undefined; } & { completion: string; }>> {
                    throw new Error('Function not implemented.');
                },
                runTestApi: function ({ body, model: reqModel }: Readonly<{ model?: string | undefined; signal?: any; timeout?: number | undefined; } & { body: string; }>): Promise<Readonly<{ stop_reason?: string | undefined; usage?: Readonly<{} & { input_tokens: number; output_tokens: number; }> | undefined; } & { completion: string; }>> {
                    throw new Error('Function not implemented.');
                },
                runApi: function ({ body, model: reqModel, signal, timeout, }: Readonly<{ model?: string | undefined; signal?: any; timeout?: number | undefined; } & { body: string; }>): Promise<Readonly<{ stop_reason?: string | undefined; usage?: Readonly<{} & { input_tokens: number; output_tokens: number; }> | undefined; } & { completion: string; }>> {
                    throw new Error('Function not implemented.');
                },
                invokeAI: function ({ messages, model, temperature, timeout, }: Readonly<{ model?: string | undefined; signal?: any; timeout?: number | undefined; messages?: any; temperature?: number | undefined; stopSequences?: string[] | undefined; } & {}>): Promise<Readonly<{} & { message: string; }>> {
                    throw new Error('Function not implemented.');
                },
                axiosInstance: AxiosInstance,
                subActions: Actions,
                configurationUtilities: ActionsConfigurationUtilities.getInstance,
                logger: undefined,
                esClient: undefined,
                savedObjectsClient: undefined,
                connector: {
                    id: '',
                    type: ''
                },
                config: undefined,
                secrets: undefined,
                normalizeURL: function (url: string): string {
                    throw new Error('Function not implemented.');
                },
                normalizeData: function (data: unknown): unknown {
                    throw new Error('Function not implemented.');
                },
                assertURL: function (url: string): void {
                    throw new Error('Function not implemented.');
                },
                ensureUriAllowed: function (url: string): void {
                    throw new Error('Function not implemented.');
                },
                getHeaders: function (headers?: AxiosRequestHeaders | undefined): Record<string, AxiosHeaderValue> {
                    throw new Error('Function not implemented.');
                },
                validateResponse: function (responseSchema: Type<unknown>, data: unknown): void {
                    throw new Error('Function not implemented.');
                },
                registerSubAction: function (subAction: SubAction): void {
                    throw new Error('Function not implemented.');
                },
                removeNullOrUndefinedFields: function (data: unknown): unknown {
                    throw new Error('Function not implemented.');
                },
                getSubActions: function (): Map<string, SubAction> {
                    throw new Error('Function not implemented.');
                },
                request: function <R>({ url, data, method, responseSchema, headers, timeout, ...config }: SubActionRequestParams<R>): Promise<AxiosResponse<R, any>> {
                    throw new Error('Function not implemented.');
                }
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
          config: {
              apiUrl: 'mocked-api-url', defaultModel: 'mocked-default-model',
              gcpRegion: '',
              gcpProjectID: ''
          },
          secrets: { accessToken: 'mocked-access-token' },
          logger: loggerMock,
          configurationUtilities: configurationUtilitiesMock,
          services: {
            savedObjectsClient: {
                create: function <T = unknown>(type: string, attributes: T, options?: SavedObjectsCreateOptions | undefined): Promise<SavedObject<T>> {
                    throw new Error('Function not implemented.');
                },
                bulkCreate: function <T = unknown>(objects: SavedObjectsBulkCreateObject<T>[], options?: SavedObjectsCreateOptions | undefined): Promise<SavedObjectsBulkResponse<T>> {
                    throw new Error('Function not implemented.');
                },
                checkConflicts: function (objects: SavedObjectsCheckConflictsObject[], options?: SavedObjectsBaseOptions | undefined): Promise<SavedObjectsCheckConflictsResponse> {
                    throw new Error('Function not implemented.');
                },
                delete: function (type: string, id: string, options?: SavedObjectsDeleteOptions | undefined): Promise<{}> {
                    throw new Error('Function not implemented.');
                },
                bulkDelete: function (objects: SavedObjectsBulkDeleteObject[], options?: SavedObjectsBulkDeleteOptions | undefined): Promise<SavedObjectsBulkDeleteResponse> {
                    throw new Error('Function not implemented.');
                },
                find: function <T = unknown, A = unknown>(options: SavedObjectsFindOptions): Promise<SavedObjectsFindResponse<T, A>> {
                    throw new Error('Function not implemented.');
                },
                bulkGet: function <T = unknown>(objects: SavedObjectsBulkGetObject[], options?: SavedObjectsGetOptions | undefined): Promise<SavedObjectsBulkResponse<T>> {
                    throw new Error('Function not implemented.');
                },
                get: function <T = unknown>(type: string, id: string, options?: SavedObjectsGetOptions | undefined): Promise<SavedObject<T>> {
                    throw new Error('Function not implemented.');
                },
                bulkResolve: function <T = unknown>(objects: SavedObjectsBulkResolveObject[], options?: SavedObjectsResolveOptions | undefined): Promise<SavedObjectsBulkResolveResponse<T>> {
                    throw new Error('Function not implemented.');
                },
                resolve: function <T = unknown>(type: string, id: string, options?: SavedObjectsResolveOptions | undefined): Promise<SavedObjectsResolveResponse<T>> {
                    throw new Error('Function not implemented.');
                },
                update: function <T = unknown>(type: string, id: string, attributes: Partial<T>, options?: SavedObjectsUpdateOptions<T> | undefined): Promise<SavedObjectsUpdateResponse<T>> {
                    throw new Error('Function not implemented.');
                },
                bulkUpdate: function <T = unknown>(objects: SavedObjectsBulkUpdateObject<T>[], options?: SavedObjectsBulkUpdateOptions | undefined): Promise<SavedObjectsBulkUpdateResponse<T>> {
                    throw new Error('Function not implemented.');
                },
                removeReferencesTo: function (type: string, id: string, options?: SavedObjectsRemoveReferencesToOptions | undefined): Promise<SavedObjectsRemoveReferencesToResponse> {
                    throw new Error('Function not implemented.');
                },
                openPointInTimeForType: function (type: string | string[], options?: SavedObjectsOpenPointInTimeOptions | undefined): Promise<SavedObjectsOpenPointInTimeResponse> {
                    throw new Error('Function not implemented.');
                },
                closePointInTime: function (id: string, options?: SavedObjectsBaseOptions | undefined): Promise<SavedObjectsClosePointInTimeResponse> {
                    throw new Error('Function not implemented.');
                },
                createPointInTimeFinder: function <T = unknown, A = unknown>(findOptions: SavedObjectsCreatePointInTimeFinderOptions, dependencies?: SavedObjectsCreatePointInTimeFinderDependencies | undefined): ISavedObjectsPointInTimeFinder<T, A> {
                    throw new Error('Function not implemented.');
                },
                collectMultiNamespaceReferences: function (objects: SavedObjectsCollectMultiNamespaceReferencesObject[], options?: SavedObjectsCollectMultiNamespaceReferencesOptions | undefined): Promise<SavedObjectsCollectMultiNamespaceReferencesResponse> {
                    throw new Error('Function not implemented.');
                },
                updateObjectsSpaces: function (objects: SavedObjectsUpdateObjectsSpacesObject[], spacesToAdd: string[], spacesToRemove: string[], options?: SavedObjectsUpdateObjectsSpacesOptions | undefined): Promise<SavedObjectsUpdateObjectsSpacesResponse> {
                    throw new Error('Function not implemented.');
                },
                getCurrentNamespace: function (): string | undefined {
                    throw new Error('Function not implemented.');
                }
            },
            scopedClusterClient: {
                get: undefined,
                name: '',
                delete: undefined,
                count: undefined,
                getSource: undefined,
                getScript: undefined,
                update: undefined,
                search: undefined,
                explain: undefined,
                [kAsyncSearch]: null,
                [kAutoscaling]: null,
                [kCat]: null,
                [kCcr]: null,
                [kCluster]: null,
                [kDanglingIndices]: null,
                [kEnrich]: null,
                [kEql]: null,
                [kEsql]: null,
                [kFeatures]: null,
                [kFleet]: null,
                [kGraph]: null,
                [kIlm]: null,
                [kIndices]: null,
                [kInference]: null,
                [kIngest]: null,
                [kLicense]: null,
                [kLogstash]: null,
                [kMigration]: null,
                [kMl]: null,
                [kMonitoring]: null,
                [kNodes]: null,
                [kQueryRuleset]: null,
                [kRollup]: null,
                [kSearchApplication]: null,
                [kSearchableSnapshots]: null,
                [kSecurity]: null,
                [kShutdown]: null,
                [kSlm]: null,
                [kSnapshot]: null,
                [kSql]: null,
                [kSsl]: null,
                [kSynonyms]: null,
                [kTasks]: null,
                [kTextStructure]: null,
                [kTransform]: null,
                [kWatcher]: null,
                [kXpack]: null,
                transport: new default,
                helpers: new default,
                child: function (opts: ClientOptions): Client {
                    throw new Error('Function not implemented.');
                },
                asyncSearch: new default,
                autoscaling: new default,
                bulk: undefined,
                cat: new default,
                ccr: new default,
                clearScroll: undefined,
                closePointInTime: undefined,
                cluster: new default,
                create: undefined,
                danglingIndices: new default,
                deleteByQuery: undefined,
                deleteByQueryRethrottle: undefined,
                deleteScript: undefined,
                enrich: new default,
                eql: new default,
                esql: new default,
                exists: undefined,
                existsSource: undefined,
                features: new default,
                fieldCaps: undefined,
                fleet: new default,
                getScriptContext: undefined,
                getScriptLanguages: undefined,
                graph: new default,
                healthReport: undefined,
                ilm: new default,
                index: undefined,
                indices: new default,
                inference: new default,
                info: undefined,
                ingest: new default,
                knnSearch: undefined,
                license: new default,
                logstash: new default,
                mget: undefined,
                migration: new default,
                ml: new default,
                monitoring: new default,
                msearch: undefined,
                msearchTemplate: undefined,
                mtermvectors: undefined,
                nodes: new default,
                openPointInTime: undefined,
                ping: undefined,
                putScript: undefined,
                queryRuleset: new default,
                rankEval: undefined,
                reindex: undefined,
                reindexRethrottle: undefined,
                renderSearchTemplate: undefined,
                rollup: new default,
                scriptsPainlessExecute: undefined,
                scroll: undefined,
                searchApplication: new default,
                searchMvt: undefined,
                searchShards: undefined,
                searchTemplate: undefined,
                searchableSnapshots: new default,
                security: new default,
                shutdown: new default,
                slm: new default,
                snapshot: new default,
                sql: new default,
                ssl: new default,
                synonyms: new default,
                tasks: new default,
                termsEnum: undefined,
                termvectors: undefined,
                textStructure: new default,
                transform: new default,
                updateByQuery: undefined,
                updateByQueryRethrottle: undefined,
                watcher: new default,
                xpack: new default
            },
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
