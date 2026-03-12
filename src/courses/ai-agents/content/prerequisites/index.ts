import { ComponentType } from "react";
import LargeLanguageModels from "./large-language-models";
import TokensAndTokenization from "./tokens-and-tokenization";
import ContextWindow from "./context-window";
import TemperatureTopPSampling from "./temperature-top-p-sampling";
import HallucinationsInLLMs from "./hallucinations-in-llms";
import PromptEngineeringFundamentals from "./prompt-engineering-fundamentals";
import SystemVsUserPrompts from "./system-vs-user-prompts";
import FewShotVsZeroShotLearning from "./few-shot-vs-zero-shot";

const contentRegistry: Record<string, ComponentType> = {
    "large-language-models": LargeLanguageModels,
    "tokens-and-tokenization": TokensAndTokenization,
    "context-window": ContextWindow,
    "temperature-top-p-sampling": TemperatureTopPSampling,
    "hallucinations-in-llms": HallucinationsInLLMs,
    "prompt-engineering-fundamentals": PromptEngineeringFundamentals,
    "system-vs-user-prompts": SystemVsUserPrompts,
    "few-shot-vs-zero-shot": FewShotVsZeroShotLearning,
};

export default contentRegistry;
