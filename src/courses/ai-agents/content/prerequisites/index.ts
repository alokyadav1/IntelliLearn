import { ComponentType } from "react";
import LargeLanguageModels from "./large-language-models";
import TokensAndTokenization from "./tokens-and-tokenization";
import ContextWindow from "./context-window";
import TemperatureTopPSampling from "./temperature-top-p-sampling";
import HallucinationsInLLMs from "./hallucinations-in-llms";
import PromptEngineeringFundamentals from "./prompt-engineering-fundamentals";
import SystemVsUserPrompts from "./system-vs-user-prompts";
import FewShotVsZeroShotLearning from "./few-shot-vs-zero-shot";
import ChainOfThoughtReasoning from "./chain-of-thought";
import FunctionCalling from "./function-calling";
import Embeddings from "./embeddings";
import VectorSimilaritySearch from "./vector-similarity-search";
import RetrievalAugmentedGeneration from "./retrieval-augmented-generation";
import WhatIsAI from "./what-is-ai";
import MachineLearningVsDeepLearning from "./ml-vs-dl";
import NeuralNetworksBasics from "./neural-networks-basics";
import TransformersArchitecture from "./transformers-architecture";
import FineTuningVsPrompting from "./fine-tuning-vs-prompting";
import ModelEvaluationMetrics from "./model-evaluation-metrics";
import OpenSourceVsClosedSource from "./open-source-vs-closed-source";

const contentRegistry: Record<string, ComponentType> = {
    "large-language-models": LargeLanguageModels,
    "tokens-and-tokenization": TokensAndTokenization,
    "context-window": ContextWindow,
    "temperature-top-p-sampling": TemperatureTopPSampling,
    "hallucinations-in-llms": HallucinationsInLLMs,
    "prompt-engineering-fundamentals": PromptEngineeringFundamentals,
    "system-vs-user-prompts": SystemVsUserPrompts,
    "few-shot-vs-zero-shot": FewShotVsZeroShotLearning,
    "chain-of-thought": ChainOfThoughtReasoning,
    "function-calling": FunctionCalling,
    "embeddings": Embeddings,
    "vector-similarity-search": VectorSimilaritySearch,
    "retrieval-augmented-generation": RetrievalAugmentedGeneration,
    "what-is-ai": WhatIsAI,
    "ml-vs-dl": MachineLearningVsDeepLearning,
    "neural-networks-basics": NeuralNetworksBasics,
    "transformers-architecture": TransformersArchitecture,
    "fine-tuning-vs-prompting": FineTuningVsPrompting,
    "model-evaluation-metrics": ModelEvaluationMetrics,
    "open-source-vs-closed-source": OpenSourceVsClosedSource,
};

export default contentRegistry;
